import { Request, Response } from "express";
import { EmpleadoService } from "../../services/index.service";
const empleadoService = new EmpleadoService();

exports.getEmpleados = async (req: Request, res: Response) => {
  const { empleados, status, error } =
    await empleadoService.getTodosEmpleados();
  res.status(status).json(empleados ? empleados : error);
};

exports.getEmpleado = async (req: Request, res: Response) => {
  const id = req.body.id;
  const { empleado, status, error } = await empleadoService.getEmpleadoPorId(
    id
  );

  res.status(status).json(empleado ? empleado : error);
};

exports.editarEmpleado = async (req: Request, res: Response) => {
  const id = req.body.id;
  const newEmpleado = req.body.newEmpleado;
  if (!newEmpleado) {
    res
      .status(400)
      .json({ msg: "No hay objeto Empleado en el cuerpo del mensaje." });
  } else {
    const { empleado, status, error } = await empleadoService.editarEmpleado(
      id,
      newEmpleado
    );
    if (error) {
      res.status(status).json(error);
    } else {
      res.status(status).json(empleado);
    }
  }
};

exports.altaEmpleado = async (req: Request, res: Response) => {
  try {
    const newEmpleado = await empleadoService.altaEmpleado(req.body);
    if (newEmpleado) {
      res
        .status(newEmpleado.status)
        .json(
          newEmpleado.status === 200
            ? newEmpleado.user
            : { user: newEmpleado.user, msg: newEmpleado.msg }
        );
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(400).json({ empleado: undefined, error: error });
  }
};

exports.resetearEmpleados = async (req: Request, res: Response) => {
  try {
    const deleteInfo = await empleadoService.resetear();
    res.status(deleteInfo.status).json(deleteInfo.msg);
  } catch (error) {
    res.status(500).json(error);
  }
};
