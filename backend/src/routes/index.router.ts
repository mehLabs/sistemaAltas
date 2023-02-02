import { Request, Response, Router } from "express";
import sequelize from "../models/db/db";
import {
  empleados,
  ciudades,
  roles,
  sectores,
  direcciones,
} from "../controllers/index.controller";

const routes = (router: Router) => {
  router.get("/", (req: Request, res: Response) => {
    res.status(200).json("Server init");
  });

  /* Inicializar base de datos con datos de ejemplos */
  router.post(
    "/init",
    sectores.init,
    ciudades.init,
    direcciones.init,
    roles.init,
    empleados.init,
    (req: Request, res: Response) => {
      res.end();
    }
  );

  router.get("/testPSQL", (req: Request, res: Response) => {
    try {
      sequelize.authenticate();
      res.status(200).json({ msg: "OK!" });
    } catch (error: any) {
      res.status(500).json(error);
    }
  });

  /* Empleados ******************* */
  router.get("/empleados", empleados.getEmpleados);
  router.get("/empleados/id/:id", empleados.getEmpleado);
  router.post("/empleados", empleados.altaEmpleado);
  router.post("/empleados/baja", empleados.bajaEmpleado);
  router.delete("/reset", ciudades.reset);
  router.put("/empleados", empleados.editarEmpleado);
  /* ************************* */

  /* Ciudades ************************ */
  router.get("/ciudades/init", ciudades.init);
  router.get("/ciudades", ciudades.getCiudades);
  router.get("/ciudades/postal/:cod_postal", ciudades.getCiudadByCP);
  router.get("/ciudades/id/:id", ciudades.getCiudadByID);
  router.get("/ciudades/name/:name", ciudades.getCiudadByName);
  router.get("/ciudades/provincia/:provincia", ciudades.getCiudadesByProvincia);
  router.get("/ciudades/provincias", ciudades.getProvincias);
  /* ********************************** */

  /* Direcciones ***************************** */
  router.post("/direcciones", direcciones.nuevaDireccion);
  router.get("/direcciones", direcciones.getDirecciones);
  router.post("/direcciones/eliminar", direcciones.eliminarDireccion);
  /* ****************************************** */

  /* Roles ********************************* */
  router.post("/roles", roles.crearRol);
  router.get("/roles", roles.getRoles);
  router.post("/roles/eliminar", roles.eliminarRol);
  /* *************************************** */

  /* Sectores ***************************** */
  router.post("/sectores", sectores.crearSector);
  router.get("/sectores", sectores.getSectores);
  router.post("/sectores/eliminar", sectores.eliminarSector);
  /* ************************************** */

  return router;
};
export default routes;
