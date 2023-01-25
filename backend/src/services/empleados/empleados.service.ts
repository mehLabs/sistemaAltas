import {
  DestroyOptions,
  FindOptions,
  Identifier,
  TruncateOptions,
  ValidationError,
} from "sequelize";
import Empleado from "../../models/empleado";

export default class {
  async getEmpleadoPorId(id: number) {
    try {
      const identifier: Identifier = id;
      const empleado: Empleado | null = await Empleado.findByPk(identifier);
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
      const empleados = await Empleado.findAll();
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
      await Empleado.destroy({ where: {}, truncate: true });
      return { status: 200, msg: "Empleados fue eliminado correctamente" };
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
      return await empleado.save();
    } catch (error) {
      return { status: 500, empleado: undefined, msg: error };
    }
  }
  async altaEmpleado(empleado: Empleado) {
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
        fecha_alta,
        createdAt,
        updatedAt,
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
        fecha_alta,
        createdAt,
        updatedAt,
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
      console.log(error);
      if (error instanceof ValidationError) {
        return { status: 400, user: undefined, msg: "Faltan campos." };
      } else {
        return { status: 500, user: undefined };
      }
    }
  }
}
