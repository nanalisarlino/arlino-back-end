//package
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
//const errorhandler = require("errorhandler"); //matikan
const app = express();
const path = require("path");
const cors = require("cors");

//file lain
const routers = require("./routers");

//middleware logging request
const log = (req, res, next) => {
  console.log(
    moment().format("h:mm:ss a") + " " + req.originalUrl + " " + req.ip
  );
  next();
};

app.use(morgan("tiny"));
//app.use(errorhandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

//Routing
app.use(routers);

//Middleware untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ status: "error", message: "Terjadi kesalahan pada server" });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
