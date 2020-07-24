const express = require("express");
const morgan = require("morgan");

const app = express();

const auth = require("./auth");

app.use(morgan("dev"));

app.use(express.json());

app.use("/auth", auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found -" + req.originalUrl);
  next(error);
}
function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}
app.use(notFound);
app.use(errorHandler);
const PORT = 3000;

app.listen(PORT, () => console.log("Server running"));
