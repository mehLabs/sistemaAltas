import express, { Application, Router } from "express";
import routes from "../routes/index.router";
import cors from "cors";
const router: Router = express.Router();

const app: Application = express();

process.on("uncaughtException", function (exception) {
  console.log(exception);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
app.use(express.json());
app.use(cors());
app.use("/api", routes(router));

export default app;
