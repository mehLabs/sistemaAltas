import express, { Express, Request, Response } from "express";
const app: Express = express();
const { PORT } = require("../config/globals");

app.get("/", (req: Request, res: Response) => {
  res.send("TS + Express inicializado");
});

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});
