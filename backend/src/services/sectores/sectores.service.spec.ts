import SectoresService from "./sectores.service";
const sectoresService = new SectoresService();

import { Sequelize } from "sequelize"; //TODO hacer una DB para testeo

describe("Sectores", () => {
  test("inicializa", async () => {
    const result = await sectoresService.init();

    expect(result.status).toStrictEqual(200);
  });
});
