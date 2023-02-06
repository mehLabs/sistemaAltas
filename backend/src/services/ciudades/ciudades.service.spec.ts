import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";
import Empleado from "../../models/empleado";
import Rol from "../../models/rol";
import Sector from "../../models/sector";
import CiudadesService from "./ciudades.service";
const ciudadesService = new CiudadesService();

describe("Servicio de ciudades", () => {
  let mockedSequelize: Sequelize;

  beforeAll(async () => {
    const options: SequelizeOptions = {
      database: "empleados",
      dialect: "postgres",
      username: "postgres",
      password: "12345",
      host: process.env.PSQL_TEST_HOST || "localhost",
      port: 5433,
      storage: ":memory",
      models: [Ciudad, Empleado, Direccion, Rol, Sector],
      define: {
        freezeTableName: true,
      },
      logging: false,
    };
    mockedSequelize = new Sequelize(options);

    await mockedSequelize.sync({ force: true });
  });

  test("debería devolver una lista de ciudades al ser llamado", async () => {
    const result = await ciudadesService.getCiudades();
    expect(result.ciudades).toBeInstanceOf(Array<Ciudad>);
    expect(result.status).toStrictEqual(200);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    mockedSequelize.close();
  });
});
