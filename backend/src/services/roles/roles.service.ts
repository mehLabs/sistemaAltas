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

  async nuevoRol(rol: any) {
    const { rol_nombre } = rol;
    if (!rol_nombre) return { status: 400, newRol: undefined };
    try {
      const newRol = await Rol.build({ rol_nombre }).save();
      return { status: newRol ? 200 : 400, newRol };
    } catch (error) {
      return { status: 500, error };
    }
  }

  crearRol = this.nuevoRol;

  async eliminarRol(rolId: number) {
    try {
      const eliminados = await Rol.destroy({ where: { rol_id: rolId } });
      return {
        status: eliminados > 0 ? 200 : 400,
        msg:
          "Ciudades" + (eliminados > 0)
            ? " "
            : "no" + " fue eliminado correctamente",
      };
    } catch (error) {
      return { status: 500, msg: error };
    }
  }

  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Rol.findAll();
    if (initialized.length < 1) {
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
