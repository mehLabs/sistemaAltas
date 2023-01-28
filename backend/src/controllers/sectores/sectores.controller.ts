import { NextFunction, Request, Response } from "express";
import Sector from "../../models/sector";
import SectoresService from "../../services/sectores/sectores.service";
const sectoresService = new SectoresService();

exports.reset = async (req: Request, res: Response) => {};

exports.crearSector = async (req: Request, res: Response) => {
  const sector = await Sector.create(req.body);

  res.status(200).json(sector);
};

exports.init = async (req: Request, res: Response, next: NextFunction) => {
  const { status, msg } = await sectoresService.init();
  res.write(msg);
  next();
};

exports.getSectores = async (req: Request, res: Response) => {
  const { status, sectores, error } = await sectoresService.getSectores();
  res.status(status).json(error ? error : sectores);
};
