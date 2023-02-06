import request from "supertest";
import app from "../server/app";

describe("Server", () => {
  test("returns example text", () => {
    return request(app).get("/api").expect(200);
  });
});
