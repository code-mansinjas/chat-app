const path = require("path");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const { app, server } = require("./socket/socket");

const router = require("./routes");
const ConnectMongoDB = require("./db/connectToMongoDB");
const { NotFoundErrorFun, GlobalErrorHandler } = require("./utils/error");

const PORT = process.env.PORT || 5000;
const dirname = path.resolve();
const ServerCallbackFun = () => {
  ConnectMongoDB();
  console.log(`Server Running at PORT ${PORT}`);
};

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

app.use(express.static(path.join(dirname, "/frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
});

app.use(GlobalErrorHandler);

server.listen(PORT, ServerCallbackFun);
