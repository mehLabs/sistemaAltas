import SectoresService from "./sectores.service";
const sectoresService = new SectoresService();

import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";
import Empleado from "../../models/empleado";
import Rol from "../../models/rol";
import Sector from "../../models/sector";

describe("Sectores", () => {
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

  test("devuelve array con sectores.", async () => {
    const result = await sectoresService.getSectores();

    expect(result.sectores).toBeInstanceOf(Array<Sector>);
    expect(result.status).toStrictEqual(200);
  });

  test("crea sector", async () => {
    const result = await sectoresService.crearSector({ sector_nombre: "Test" });
    expect(result.status).toStrictEqual(200);
    expect(result.sector).toBeInstanceOf(Sector);
  });

  test("no crea sector si faltan atributos", async () => {
    const result = await sectoresService.crearSector({ algo: "asd" });
    expect(result.status).toStrictEqual(400);
    expect(result.sector).toBeUndefined();
  });

  test("puede eliminar sectores con ID", async () => {
    const mock = await sectoresService.crearSector({
      sector_nombre: "Test",
    });
    const result = await sectoresService.eliminarSector(
      mock.sector.dataValues.sector_id || 1
    );

    expect(result.status).toStrictEqual(200);
    expect(result.error).toBeUndefined();
  });

  test("No elimina sector si el id no existe", async () => {
    const before = await sectoresService.getSectores();
    const result = await sectoresService.eliminarSector(0);
    const after = await sectoresService.getSectores();
    expect(result.status).toEqual(400);
    expect(before).toEqual(after);
  });
});
