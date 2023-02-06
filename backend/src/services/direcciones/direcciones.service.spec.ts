import { SequelizeOptions, Sequelize } from "sequelize-typescript";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";
import Empleado from "../../models/empleado";
import Rol from "../../models/rol";
import Sector from "../../models/sector";
import { CiudadesService, DireccionesService } from "../index.service";
const direccionesService = new DireccionesService();

describe("Servicio direcciones", () => {
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
    await new CiudadesService().init();
  }, 1000 * 10);

  afterAll(async () => {
    jest.clearAllMocks();
    mockedSequelize.close();
  });

  it("debería devolver una lista de direcciones", async () => {
    const result = await direccionesService.getDirecciones();

    expect(result.status).toStrictEqual(200);
    expect(result.direcciones).toBeInstanceOf(Array<Direccion>);
  });
});
