import { NextFunction, Request, Response } from "express";
import { CiudadesService } from "../../services/index.service";
const service = new CiudadesService();

exports.reset = async (req: Request, res: Response) => {
  const { status, msg } = await service.reset();
  res.status(status).json(msg);
};

exports.init = async (req: Request, res: Response, next: NextFunction) => {
  const { status, msg } = await service.init();
  res.write(msg);
  next();
};

exports.selfInit = () => {
  service.init();
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
    const { error, ciudad, status } = await service.getCiudadByName(name);
    res.status(status).json(error ? error : ciudad);
  }
};

exports.getProvincias = async (req: Request, res: Response) => {
  const { error, provincias, status } = await service.getProvincias();

  res.status(status).json(error ? error : provincias);
};

exports.getCiudadesByProvincia = async (req: Request, res: Response) => {
  const provincia = req.params.provincia;
  if (!provincia)
    res.status(400).json({ error: "No se proveyó de una provincia" });
  const { ciudades, error, status } = await service.getCiudadesByProvincia(
    provincia
  );

  res.status(status).json(error ? error : ciudades);
};
