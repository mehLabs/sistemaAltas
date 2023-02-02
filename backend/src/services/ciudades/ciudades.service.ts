import { readFileSync } from "fs";
import path from "path";
import xlsx, { WorkBook } from "xlsx";
import Ciudad from "../../models/ciudad";

export default class {
  async reset() {
    try {
      await Ciudad.truncate({ cascade: true });

      await Ciudad.sequelize?.sync({ force: true });
      await this.init();
      return { status: 200, msg: "Ciudades fue eliminado correctamente" };
    } catch (error) {
      return { status: 500, msg: error };
    }
  }

  async getCiudades() {
    try {
      const ciudades = await Ciudad.findAll();
      return { status: 200, ciudades };
    } catch (error) {
      return { status: 500, ciudades: [], error: error };
    }
  }

  async getCiudadById(id: number) {
    try {
      const ciudad = await Ciudad.findByPk(id);
      return { status: 200, ciudad };
    } catch (error) {
      return { status: 500, ciudad: undefined, error };
    }
  }

  async getCiudadByCP(cp: number) {
    try {
      const ciudades = await Ciudad.findAll({ where: { cod_postal: cp } });
      return { status: 200, ciudades };
    } catch (error) {
      return { status: 500, ciudad: undefined, error };
    }
  }

  async getCiudadByName(name: string) {
    try {
      const ciudad = await Ciudad.findOne({ where: { ciudad_nombre: name } });
      if (ciudad) return { status: 200, ciudad };
      return { status: 400, ciudad: undefined, error: "Ciudad no encontrada." };
    } catch (error) {
      return { status: 500, ciudad: undefined, error };
    }
  }

  async getProvincias() {
    try {
      const provincias = await Ciudad.sequelize?.query(
        'SELECT "provincia_nombre" FROM "Ciudad" GROUP BY "provincia_nombre"'
      );
      return {
        status: provincias ? 200 : 500,
        provincias: provincias ? provincias[0] : undefined,
        msg: provincias ? "" : "Hubo un problema...",
      };
    } catch (error) {
      console.log(error);
      return { status: 500, error: error };
    }
  }

  async getCiudadesByProvincia(provincia_nombre: string) {
    try {
      const ciudades = await Ciudad.findAll({
        where: { provincia_nombre: provincia_nombre },
      });
      return {
        status: ciudades ? 200 : 400,
        ciudades,
        msg: ciudades ? "ok" : "No existe esa provincia",
      };
    } catch (error) {
      return { status: 500, error };
    }
  }

  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Ciudad.findAll();
    if (initialized.length < 1) {
      const xlsxPath = path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "cod_postales.xlsx"
      );
      const buf = readFileSync(xlsxPath);
      const workbook: WorkBook = xlsx.read(buf);

      let cod_postales: string[] = workbook.SheetNames;
      let ciudades: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[cod_postales[0]]
      );

      await Ciudad.bulkCreate<Ciudad>(ciudades);
      await Ciudad.create<Ciudad>({
        cod_postal: 1000,
        provincia_nombre: "",
        ciudad_nombre: "",
      });
      return { status: 200, msg: "Ciudades inicializadas." };
    } else {
      return { status: 400, msg: "Ciudades ya inicializadas." };
    }
  }
}
