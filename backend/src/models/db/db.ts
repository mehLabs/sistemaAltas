import { Sequelize } from "sequelize-typescript";
import Ciudad from "../ciudad";
import Direccion from "../direccion";
import Empleado from "../empleado";
import Rol from "../rol";
import Sector from "../sector";
import { CiudadesService } from "../../services/index.service";

const sequelize = new Sequelize({
  database: process.env.PSQL_DATABASE || "empleados",
  dialect: "postgres",
  username: process.env.PSQL_USERNAME || "postgres",
  password: process.env.PSQL_PASSWORD || "12345",
  host: process.env.PSQL_HOST || "localhost",
  port: 5432,
  storage: ":memory",
  models: [Empleado, Ciudad, Direccion, Rol, Sector],
  define: {
    freezeTableName: true,
  },
  logging: false,
});
//Si la base de datos es nueva, inicializa la lista de ciudades
sequelize.sync({ force: false }).then((_seq) => {
  new CiudadesService().init();
});

export default sequelize;
