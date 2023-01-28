import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import xlsx, { WorkBook } from "xlsx";
import Direccion from "../../models/direccion";

export default class {
  async reset() {}
  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Direccion.findOne({
      where: { dir_id: 1 },
    });
    if (!initialized) {
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

      await Direccion.bulkCreate<Direccion>(direcciones);
      return { status: 200, msg: "Direcciones inicializadas." };
    } else {
      return { status: 400, msg: "Direcciones ya inicializadas." };
    }
  }
}
