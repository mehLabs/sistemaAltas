import app from "./app";
const { PORT } = require("../config/globals");

app.listen(PORT || 8000, () => {
  console.log("Backend iniciado");
});

export default app;
