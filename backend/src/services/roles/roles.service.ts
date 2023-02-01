import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import xlsx, { WorkBook } from "xlsx";
import Rol from "../../models/rol";

export default class {
  async reset() {}

  async getRoles() {
    try {
      const roles = await Rol.findAll();
      if (roles) return { status: 200, roles };
      return { status: 400, roles: [] };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async nuevoRol(rol: Rol) {
    const { rol_nombre } = rol;
    try {
      const newRol = await Rol.build({ rol_nombre }).save();
      return { status: newRol ? 200 : 400, newRol };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async eliminarRol(rolId: number) {
    try {
      let rol = await Rol.findByPk(rolId);
      rol?.destroy();
      return { status: rol ? 200 : 400, msg: rol ? "OK" : "No existe el rol" };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Rol.findOne({ where: { rol_id: 20 } });
    if (!initialized) {
      const xlsxPath = path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "roles.xlsx"
      );
      const buf = readFileSync(xlsxPath);
      const workbook: WorkBook = xlsx.read(buf);

      let rol_nombres: string[] = workbook.SheetNames;
      let roles: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[rol_nombres[0]]
      );

      await Rol.bulkCreate<Rol>(roles);
      return { status: 200, msg: "Roles inicializadas." };
    } else {
      return { status: 400, msg: "Roles ya inicializadas." };
    }
  }
}
