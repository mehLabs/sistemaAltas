import { NextFunction, Request, Response } from "express";
import Direccion from "../../models/direccion";
import { DireccionesService } from "../../services/index.service";
const direccionesService = new DireccionesService();

exports.reset = async (req: Request, res: Response) => {};

exports.nuevaDireccion = async (req: Request, res: Response) => {
  try {
    const direccion = req.body;
    const newDir = await Direccion.create(direccion);
    res.status(200).json(newDir);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.init = async (req: Request, res: Response, next: NextFunction) => {
  const { msg } = await direccionesService.init();

  res.write(msg);
  next();
};
