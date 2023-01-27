import app from "./app";
const { PORT } = require("../config/globals");

app.listen(PORT, () => {});

export default app;
