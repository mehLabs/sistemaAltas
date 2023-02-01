import { NextFunction, Request, Response } from "express";
import Direccion from "../../models/direccion";
import { DireccionesService } from "../../services/index.service";
const direccionesService = new DireccionesService();

const reset = async (req: Request, res: Response) => {};

const nuevaDireccion = async (req: Request, res: Response) => {
  try {
    const direccion = req.body;
    const newDir = await Direccion.create(direccion);
    res.status(200).json(newDir);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDirecciones = async (req: Request, res: Response) => {
  const { error, direcciones, status } =
    await direccionesService.getDirecciones();
  res.status(status).json(error ? error : direcciones);
};

const eliminarDireccion = async (req: Request, res: Response) => {
  const id = req.body.id;
  if (!id) return res.json(400).json({ msg: "Falta id" });
  const { error, msg, status } = await direccionesService.eliminarDireccion(id);
  res.status(status).json(error ? error : msg);
};

const init = async (req: Request, res: Response, next: NextFunction) => {
  const { msg } = await direccionesService.init();

  res.write(msg);
  next();
};

export const direcciones = {
  eliminarDireccion,
  getDirecciones,
  init,
  nuevaDireccion,
  reset,
};
