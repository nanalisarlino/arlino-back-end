const express = require("express");
const routers = express.Router();
const path = require("path");

// Routing

//buka dan download foto
routers.get("/bukafoto", (req, res) => {
  const filename = "logo-uk-white-e1649944158280.png";
  res.sendFile(__dirname + "/foto/" + filename);
});
routers.get("/autodownloadfoto", (req, res) => {
  const filename = "logo-uk-white-e1649944158280.png";
  res.download(
    path.join(__dirname + "/foto/" + filename),
    "logo-uk-white-e1649944158280.png"
  );
});

//masukan username dan password
routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login page",
    data: {
      username: username,
      password: password,
    },
  });
});

//routing biasa menggunakan berbagai request
routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);

// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;
