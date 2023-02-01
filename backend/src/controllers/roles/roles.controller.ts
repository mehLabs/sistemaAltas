import { NextFunction, Request, Response } from "express";
import Rol from "../../models/rol";
import { RolesService } from "../../services/index.service";
const rolesService = new RolesService();

const reset = async (req: Request, res: Response) => {};

const crearRol = async (req: Request, res: Response) => {
  const rol = await Rol.create(req.body);

  res.status(200).json(rol);
};

const init = async (req: Request, res: Response, next: NextFunction) => {
  const { status, msg } = await rolesService.init();
  res.write(msg);
  next();
};

const getRoles = async (req: Request, res: Response) => {
  const { status, roles, error } = await rolesService.getRoles();
  res.status(status).json(error ? error : roles);
};

const eliminarRol = async (req: Request, res: Response) => {
  const id = req.body.id;
  if (!id) return res.status(200).json({ msg: "Falta id" });
  const { status, error, msg } = await rolesService.eliminarRol(id);
  res.status(status).json(error ? error : msg);
};

export const roles = { crearRol, eliminarRol, getRoles, init, reset };
