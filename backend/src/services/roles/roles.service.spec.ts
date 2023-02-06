import RolesService from "./roles.service";
const rolesService = new RolesService();

import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";
import Empleado from "../../models/empleado";
import Rol from "../../models/rol";
import Sector from "../../models/sector";

describe("Roles", () => {
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

  afterAll(async () => {
    jest.clearAllMocks();
    await mockedSequelize.close();
  });

  test("devuelve array con roles.", async () => {
    const result = await rolesService.getRoles();

    expect(result.roles).toBeInstanceOf(Array<Rol>);
    expect(result.status).toStrictEqual(200);
  });

  test("crea rol", async () => {
    const result = await rolesService.crearRol({ rol_nombre: "Test" });
    expect(result.status).toStrictEqual(200);
    expect(result.newRol).toBeInstanceOf(Rol);
  });

  test("no crea rol si faltan atributos", async () => {
    const result = await rolesService.crearRol({ algo: "asd" });
    expect(result.status).toStrictEqual(400);
    expect(result.newRol).toBeUndefined();
  });

  test("puede eliminar roles con ID", async () => {
    const mock = await rolesService.crearRol({
      rol_nombre: "Test",
    });
    const result = await rolesService.eliminarRol(
      mock.newRol?.dataValues.rol_id || 1
    );
    if (result.status === 500) {
      console.log(result);
      console.log(mock);
    }
    expect(result.status).toStrictEqual(200);
  });

  test("No elimina rol si el id no existe", async () => {
    const before = await rolesService.getRoles();
    const result = await rolesService.eliminarRol(0);
    const after = await rolesService.getRoles();
    expect(result.status).toEqual(400);
    expect(before).toEqual(after);
  });
});
