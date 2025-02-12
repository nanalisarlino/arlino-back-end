const express = require('express');
const moment = require('moment');
const { user } = require('./users'); // Pastikan ini benar!

const app = express();
const port = 3000;

// Middleware agar bisa menangani JSON
app.use(express.json());

app.get('/page', (req, res) => {
    const { page } = req.query; // HARUS di dalam route handler

    if (!page || page === '') {
        return res.status(200).send('This is the home page');
    } else if (page === 'about') {
        return res.status(200).json({
            status: 'success',
            message: 'Response Success',
            description: 'Exercise #02',
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
    } else if (page === 'users') {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({
            status: 'not found',
            message: 'Route tidak ditemukan',
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
    }
});

// Gunakan app.listen() BUKAN server.listen()
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});