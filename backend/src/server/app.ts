import express, { Application, Router } from "express";
import routes from "../routes/index.router";
import cors from "cors";
const router: Router = express.Router();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes(router));

export default app;
