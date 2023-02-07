import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import xlsx, { WorkBook } from "xlsx";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";

export default class {
  async reset() {
    try {
      await Direccion.truncate({ cascade: true });
      return { status: 200, msg: "Direcciones fue eliminado correctamente" };
    } catch (error) {
      return { status: 500, msg: error };
    }
  }

  async getDirecciones() {
    try {
      const direcciones = await Direccion.findAll();
      return { status: 200, direcciones };
    } catch (error) {
      return { status: 500, error };
    }
  }
  async getDireccion(id: number) {
    try {
      const direccion = await Direccion.findByPk(id, { include: [Ciudad] });
      return { status: direccion ? 200 : 400, direccion };
    } catch (error) {
      return { status: 500, error };
    }
  }
  async nuevaDireccion(dir: Direccion) {
    try {
      const { id_ciudad, cod_postal, direccion } = dir;

      const newDireccion = await Direccion.build({
        id_ciudad,
        cod_postal,
        direccion,
      }).save();
      return {
        status: newDireccion ? 200 : 400,
        newDireccion,
        msg: newDireccion ? "" : "Faltan atributos...",
      };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async eliminarDireccion(dir_id: number) {
    try {
      const eliminado: number = await Direccion.destroy({
        where: { dir_id: dir_id },
      });
      return {
        status: eliminado > 0 ? 200 : 400,
        msg: eliminado ? "Eliminado" : "No encontrado.",
      };
    } catch (error) {
      return { status: 500, error };
    }
  }
  async init(): Promise<{ status: number; msg: string }> {
    console.log("init direcciones");
    const initialized = await Direccion.findAll();
    if (initialized.length < 1) {
      const xlsxPath = path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "direcciones.xlsx"
      );
      const buf = readFileSync(xlsxPath);
      const workbook: WorkBook = xlsx.read(buf);

      let direccion_nombres: string[] = workbook.SheetNames;
      let direcciones: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[direccion_nombres[0]]
      );
      console.log("Direcciones");
      console.log(direcciones);

      await Direccion.bulkCreate<Direccion>(direcciones);
      return { status: 200, msg: "Direcciones inicializadas." };
    } else {
      return { status: 400, msg: "Direcciones ya inicializadas." };
    }
  }
}
