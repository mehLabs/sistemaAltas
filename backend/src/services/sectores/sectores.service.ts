import { readFileSync } from "fs";
import path from "path";
import xlsx, { WorkBook } from "xlsx";
import Sector from "../../models/sector";

export default class {
  async reset() {}

  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Sector.findOne({ where: { sector_id: 1 } });
    if (!initialized) {
      const xlsxPath = path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "sectores.xlsx"
      );
      const buf = readFileSync(xlsxPath);
      const workbook: WorkBook = xlsx.read(buf);

      let sector_nombres: string[] = workbook.SheetNames;
      let sectores: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[sector_nombres[0]]
      );

      await Sector.bulkCreate<Sector>(sectores);
      return { status: 200, msg: "sectores inicializadas." };
    } else {
      return { status: 400, msg: "sectores ya inicializadas." };
    }
  }

  async eliminarSector(id: number) {
    try {
      const eliminado = await Sector.destroy({ where: { sector_id: id } });
      return {
        status: eliminado > 0 ? 200 : 400,
        msg: eliminado ? "Eliminado" : "No existe ese sector",
      };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async getSectores() {
    try {
      const sectores = await Sector.findAll();
      if (sectores) return { status: 200, sectores };
      return { status: 400, sectores: [] };
    } catch (error) {
      return { status: 500, error };
    }
  }
}
