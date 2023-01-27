import { Request, Response } from "express";
import { ciudadesService } from "../../services/index.service";
const service = new ciudadesService();
service.init();

exports.reset = async (req: Request, res: Response) => {
  const { status, msg } = await service.reset();
  res.status(status).json(msg);
};

exports.init = async (req: Request, res: Response) => {
  const { status, msg } = await service.init();
  res.status(status).json(msg);
};

exports.getCiudades = async (req: Request, res: Response) => {
  const { ciudades, error, status } = await service.getCiudades();
  res.status(status).json(error ? error : ciudades);
};

exports.getCiudadByCP = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.cod_postal);
  if (!id) {
    res.status(400).json({ error: "No se proveyó de un código postal." });
  } else {
    const { ciudades, status } = await service.getCiudadByCP(id);
    res.status(status).json(ciudades);
  }
};

exports.getCiudadByID = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id);
  if (!id) {
    res.status(400).json({ error: "No se proveyó de un id." });
  } else {
    const { ciudad, status } = await service.getCiudadById(id);
    res.status(status).json(ciudad);
  }
};

exports.getCiudadByName = async (req: Request, res: Response) => {
  const name = req.params.ciudad;
  if (!name) {
    res.status(400).json({ error: "No se proveyó de un nombre." });
  } else {
    const { ciudad, status } = await service.getCiudadByName(name);
  }
};
