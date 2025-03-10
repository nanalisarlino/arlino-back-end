const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const routers = express.Router();
const users = require("./users");

// Konfigurasi Multer untuk upload file gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Simpan di folder 'public/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama unik
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Hanya file gambar yang diizinkan"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

// Menampilkan semua data users
routers.get("/users", (req, res) => res.status(200).json(users));

// Menampilkan data user sesuai nama
routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "Data user tidak ditemukan" });
  }

  res.json({ status: "success", data: user });
});

// Menambah data user
routers.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ status: "error", message: "Masukkan data yang akan diubah" });
  }

  const newUser = { id: users.length + 1, name };
  users.push(newUser);

  res.status(201).json({
    status: "success",
    message: "User berhasil ditambahkan",
    data: newUser,
  });
});

// Buka dan download foto
routers.get("/bukafoto", (req, res) => {
  const filename = "logo-uk-white-e1649944158280.png";
  const filePath = path.join(__dirname, "assets", filename);

  if (!fs.existsSync(filePath)) {
    return res
      .status(404)
      .json({ status: "error", message: "File tidak ditemukan" });
  }

  res.sendFile(filePath);
});

routers.get("/download", (req, res) => {
  const filename = "logo-uk-white-e1649944158280.png";
  const filePath = path.join(__dirname, "assets", filename);

  if (!fs.existsSync(filePath)) {
    return res
      .status(404)
      .json({ status: "error", message: "File tidak ditemukan" });
  }

  res.download(filePath, filename);
});

// Upload file
routers.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "File harus diunggah" });
  }

  res.json({
    status: "success",
    message: "File berhasil diunggah",
    filename: req.file.filename,
  });
});

// Update user
routers.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const { newName } = req.body;

  if (!newName) {
    return res
      .status(400)
      .json({ status: "error", message: "Nama baru harus diisi" });
  }

  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "User tidak ditemukan" });
  }

  users[userIndex].name = newName;
  res.json({
    status: "success",
    message: "User berhasil diperbarui",
    data: users[userIndex],
  });
});

// Hapus user
routers.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "User tidak ditemukan" });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.json({
    status: "success",
    message: "User berhasil dihapus",
    data: deletedUser,
  });
});

module.exports = routers;
