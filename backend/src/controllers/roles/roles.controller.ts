import { NextFunction, Request, Response } from "express";
import Rol from "../../models/rol";
import { RolesService } from "../../services/index.service";
const rolesService = new RolesService();

exports.reset = async (req: Request, res: Response) => {};

exports.crearRol = async (req: Request, res: Response) => {
  const rol = await Rol.create(req.body);

  res.status(200).json(rol);
};

exports.init = async (req: Request, res: Response, next: NextFunction) => {
  const { status, msg } = await rolesService.init();
  res.write(msg);
  next();
};

exports.getRoles = async (req: Request, res: Response) => {
  const { status, roles, error } = await rolesService.getRoles();
  res.status(status).json(error ? error : roles);
};
