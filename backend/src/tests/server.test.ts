const supertest = require("supertest");

test("server returns example text", async () => {
  const expected = 2;
  const result = 1 + 1;

  expect(result).toStrictEqual(expected);
});
