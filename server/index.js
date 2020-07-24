const express = require("express");
const morgan = require("morgan");

const app = express();

const auth = require("./auth/index");

app.use(morgan("dev"));

express.json();
app.use("/auth", auth);

const PORT = 3000;

app.listen(PORT, () => console.log("Server running"));
