import express, { Request, Response } from "express";
import sequelize from "../models/db/db";
const {
  empleados,
  ciudades,
  roles,
  sectores,
  direcciones,
} = require("../controllers/index.controller");

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server init");
});

router.get("/empleados", empleados.getEmpleados);
router.get("/empleados/id", empleados.getEmpleado);
router.post("/empleados", empleados.altaEmpleado);
router.delete(
  "/empleados/reset",
  empleados.resetearEmpleados,
  ciudades.reset,
  roles.reset,
  sectores.reset,
  direcciones.reset
);
router.put("/empleados", empleados.editarEmpleado);
router.get("/testPSQL", (req: Request, res: Response) => {
  try {
    sequelize.authenticate();
    res.status(200).json({ msg: "OK!" });
  } catch (error: any) {
    console.log(error);
  }
});

export default router;
