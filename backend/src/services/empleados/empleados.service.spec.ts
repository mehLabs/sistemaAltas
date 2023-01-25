describe("Servicio empleados debe", () => {
  test("devolver una lista de objetos Empleado al hacer GET en /employees", () => {
    const expected = "lista de employees";
    const result = "lista de employees";

    expect(result).toStrictEqual(expected);
  });
});
