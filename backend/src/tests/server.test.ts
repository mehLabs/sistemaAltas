import request from "supertest";
import app from "../server/app";

describe("Server", () => {
  test("returns example text", async () => {
    const result = await request(app).get("/").expect(200);

    expect(result.status).toStrictEqual(200);
  });
});
