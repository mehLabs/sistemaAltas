import { NextFunction, Request, Response } from "express";
import { EmpleadoService } from "../../services/index.service";
const empleadoService = new EmpleadoService();

const init = async (req: Request, res: Response, next: NextFunction) => {
  const { msg } = await empleadoService.init();

  res.write(msg);
  next();
};

const getEmpleados = async (req: Request, res: Response) => {
  const { empleados, status, error } =
    await empleadoService.getTodosEmpleados();
  res.status(status).json(empleados ? empleados : error);
};

const getEmpleado = async (req: Request, res: Response) => {
  const id = req.body.id;
  const { empleado, status, error } = await empleadoService.getEmpleadoPorId(
    id
  );

  res.status(status).json(empleado ? empleado : error);
};

const editarEmpleado = async (req: Request, res: Response) => {
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

const bajaEmpleado = async (req: Request, res: Response) => {
  const id = req.body.id;
  if (!id) return res.status(400).json({ msg: "FALTA ID!!!!" });
  const { empleado, error, status } = await empleadoService.bajaEmpleado(id);
  res.status(status).json(error ? error : empleado);
};

const altaEmpleado = async (req: Request, res: Response) => {
  const emp = req.body;
  console.log(emp);
  try {
    const { user, error, status, msg } = await empleadoService.altaEmpleado(
      emp
    );
    res.status(status).json(error ? error : user);
  } catch (error) {
    res.status(400).json({ empleado: undefined, error: error });
  }
};

const resetearEmpleados = async (req: Request, res: Response) => {
  try {
    const deleteInfo = await empleadoService.resetear();
    res.status(deleteInfo.status).json(deleteInfo.msg);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const empleados = {
  altaEmpleado,
  bajaEmpleado,
  editarEmpleado,
  getEmpleado,
  getEmpleados,
  init,
  resetearEmpleados,
};
