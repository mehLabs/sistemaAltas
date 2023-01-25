import app from "./app";
const { PORT } = require("../config/globals");
import router from "../routes/router";

app.get("/api", router);

app.listen(PORT, () => {});

export default app;
