import { FindOptions, Identifier, ValidationError } from "sequelize";
import Empleado from "../../models/empleado";
import Direccion from "../../models/direccion";
import Rol from "../../models/rol";
import Sector from "../../models/sector";
import path from "path";
import { readFileSync } from "fs";
import xlsx, { WorkBook } from "xlsx";
import Ciudad from "../../models/ciudad";

export default class {
  async getEmpleadoPorId(id: number) {
    try {
      const identifier: Identifier = id;
      const empleado: Empleado | null = await Empleado.findByPk(identifier, {
        include: [
          { model: Direccion, required: false, include: [Ciudad] },
          Sector,
          Rol,
        ],
      });
      return {
        status: empleado ? 200 : 400,
        empleado: empleado ? empleado : "Empleado no encontrado.",
      };
    } catch (error) {
      return { status: 500, error };
    }
  }
  async getTodosEmpleados() {
    try {
      const empleados = await Empleado.findAll({
        where: { alta: true },
        include: [
          { model: Direccion, required: false, include: [Ciudad] },
          Sector,
          Rol,
        ],
      });
      return { status: 200, empleados };
    } catch (error) {
      return { status: 500, error };
    }
  }
  async editarEmpleado(id: number, empleado: Empleado) {
    try {
      const viejoEmpleado = await Empleado.findByPk(id);
      if (!empleado) return { status: 400, msg: "No hay empleado en el body" };
      if (!viejoEmpleado) return { status: 400, msg: "Empleado inexistente" };
      else {
        const newEmpleado = await Empleado.update(empleado, {
          where: { em_id: id },
        });
        return { empleado: newEmpleado, status: 200 };
      }
    } catch (error) {
      return { status: 500, error: error };
    }
  }
  async resetear() {
    try {
      await Empleado.truncate({ cascade: true });
      return { status: 200, msg: "Ciudades fue eliminado correctamente" };
    } catch (error) {
      return { status: 500, msg: error };
    }
  }
  async bajaEmpleado(id: number) {
    try {
      const condition: FindOptions = { where: { em_id: id } };
      const empleado: Empleado | null = await Empleado.findOne(condition);
      if (!empleado) {
        return {
          empleado: undefined,
          status: 400,
          msg: "Empleado no encontrado.",
        };
      }
      empleado.alta = false;
      const newEmpleado = await empleado.save();
      return { status: 200, empleado: newEmpleado };
    } catch (error) {
      return { status: 500, empleado: undefined, error: error };
    }
  }
  async altaEmpleado(empleado: Empleado | any) {
    try {
      let {
        genero,
        dir_id,
        sector_id,
        rol_id,
        telefono,
        nombre,
        apellido,
        fecha_nacimiento,
        salario,
        descripcion,
        fecha_alta,
      } = empleado;
      let task = Empleado.build({
        alta: true,
        genero,
        dir_id,
        sector_id,
        rol_id,
        telefono,
        nombre,
        apellido,
        fecha_nacimiento,
        salario,
        descripcion,
        fecha_alta,
      });

      const newEmpleado = await task.save();
      let response;
      if (newEmpleado) {
        response = {
          status: 200,
          user: newEmpleado,
        };
      } else {
        response = {
          status: 500,
          user: undefined,
        };
      }
      return response;
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          status: 400,
          user: undefined,
          msg: `Faltan estos campos: ${error.errors
            .map((errorMsg) => errorMsg.path)
            .join(", ")}.`,
        };
      } else {
        return { status: 500, error, user: undefined };
      }
    }
  }

  async init(): Promise<{ status: number; msg: string }> {
    const initialized = await Empleado.findAll();
    if (initialized.length < 1) {
      const xlsxPath = path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "empleados.xlsx"
      );
      const buf = readFileSync(xlsxPath);
      const workbook: WorkBook = xlsx.read(buf);

      let cod_postales: string[] = workbook.SheetNames;
      let empleados: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[cod_postales[0]]
      );

      await Empleado.bulkCreate<Empleado>(empleados);
      return { status: 200, msg: "Empleados inicializados." };
    } else {
      return { status: 400, msg: "Empleados ya inicializados." };
    }
  }
}
