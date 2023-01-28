import { Request, Response, Router } from "express";
import sequelize from "../models/db/db";
const {
  empleados,
  ciudades,
  roles,
  sectores,
  direcciones,
} = require("../controllers/index.controller");

const routes = (router: Router) => {
  router.get("/", (req: Request, res: Response) => {
    res.status(200).json("Server init");
  });

  /* Inicializar base de datos con ejemplos */
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
  router.get("/empleados/id", empleados.getEmpleado);
  router.post("/empleados", empleados.altaEmpleado);
  router.delete(
    "/reset",
    ciudades.reset,
    empleados.resetearEmpleados,
    roles.reset,
    sectores.reset,
    direcciones.reset
  );
  router.put("/empleados", empleados.editarEmpleado);
  /* ************************* */

  /* Ciudades ************************ */
  router.get("/ciudades/init", ciudades.init);
  router.get("/ciudades", ciudades.getCiudades);
  router.get("/ciudades/:cod_postal", ciudades.getCiudadByCP);
  router.get("/ciudades/id/:id", ciudades.getCiudadByID);
  router.get("/ciudades/name/:name", ciudades.getCiudadByName);
  /* ********************************** */

  /* Direcciones ***************************** */
  router.post("/direcciones", direcciones.nuevaDireccion);
  /* ****************************************** */

  /* Roles ********************************* */
  router.post("/roles", roles.crearRol);
  router.get("/roles", roles.getRoles);
  /* *************************************** */

  /* Sectores ***************************** */
  router.post("/sectores", sectores.crearSector);
  /* ************************************** */

  return router;
};
export default routes;
