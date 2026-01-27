const express = require("express");
const cors = require("cors");

const evaluateRoutes = require("./routes/evaluate.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const requestIdMiddleware = require("./middlewares/requestId.middleware");

const app = express();

app.use(cors());              // ✅ Express 4 handles OPTIONS correctly
app.use(express.json());
app.use(requestIdMiddleware);

app.use("/", evaluateRoutes);

app.use(errorMiddleware);

module.exports = app;
