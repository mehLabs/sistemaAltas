import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import Ciudad from "../../models/ciudad";
import Direccion from "../../models/direccion";
import Empleado from "../../models/empleado";
import Rol from "../../models/rol";
import Sector from "../../models/sector";
import EmpleadosService from "../empleados/empleados.service";
import { initAll } from "../index.service";
const empleadosService = new EmpleadosService();

describe("Servicio empleados", () => {
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

    await initAll();
  }, 1000 * 15);

  afterAll(async () => {
    jest.clearAllMocks();
    mockedSequelize.close();
  });

  it("debería poder crear un empleado", async () => {
    const response = await empleadosService.altaEmpleado({
      genero: "h",
      dir_id: 1,
      sector_id: 1,
      rol_id: 1,
      descripcion: "Ni idea",
      telefono: 155132600,
      nombre: "Hugo",
      apellido: "Iturrieta",
      fecha_nacimiento: "1998-04-21",
      salario: 100000,
      fecha_alta: "2021-04-21",
    });

    expect(response.status).toStrictEqual(200);
    expect(response.user).toBeDefined();
  });

  it("debería devolver un array de empleados con todos los atributos", async () => {
    const response = await empleadosService.getTodosEmpleados();
    expect(response.empleados).toBeInstanceOf(Array<Empleado>);
    expect(response.status).toStrictEqual(200);
    if (response.empleados) {
      expect(response.empleados[0].dataValues.direccion).toBeInstanceOf(
        Direccion
      );
      expect(response.empleados[0].dataValues.sector).toBeInstanceOf(Sector);
      expect(response.empleados[0].dataValues.rol).toBeInstanceOf(Rol);
      expect(response.empleados[0].dataValues.descripcion).toBeDefined();
    }
  });

  it("debería devolver error si al crear empleado faltan atributos", async () => {
    const response = await empleadosService.altaEmpleado({
      descripcion: "Ni idea",
      telefono: 155132600,
      nombre: "Hugo",
      fecha_nacimiento: "1998-14-21",
      salario: 100000,
      fecha_alta: "2021-04-21",
    });

    expect(response.status).toStrictEqual(400);
    expect(response.user).toBeUndefined();
  });
});
