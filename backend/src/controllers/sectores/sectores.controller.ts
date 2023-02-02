import { NextFunction, Request, Response } from "express";
import Sector from "../../models/sector";
import SectoresService from "../../services/sectores/sectores.service";
const sectoresService = new SectoresService();

const reset = async (req: Request, res: Response) => {};

const crearSector = async (req: Request, res: Response) => {
  const sector = await Sector.create(req.body);

  res.status(200).json(sector);
};

const init = async (req: Request, res: Response, next: NextFunction) => {
  await Sector.sequelize?.sync({ force: true });
  const { status, msg } = await sectoresService.init();
  console.log(msg);
  res.write(msg);
  next();
};

const getSectores = async (req: Request, res: Response) => {
  const { status, sectores, error } = await sectoresService.getSectores();
  res.status(status).json(error ? error : sectores);
};

const eliminarSector = async (req: Request, res: Response) => {
  const id = req.body.id;
  if (!id) return res.status(400).json({ msg: "Falta ID" });
  const { status, msg, error } = await sectoresService.eliminarSector(id);
  res.status(status).json(error ? error : msg);
};

export const sectores = {
  crearSector,
  eliminarSector,
  getSectores,
  init,
  reset,
};
