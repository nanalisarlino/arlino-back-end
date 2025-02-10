const http = require('http');
const {hello, greetings} = require('./helloworld')
const moment = require('moment')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World'))
app.get('/about', (req, res) => res.status(200).json({
    status : 'success',
    message : 'about page',
    data : []
}))
app.post('/contoh', (req, res) => {
    res.send('request dengan method POST')
})

app.put('/contoh', (req, res) => {
    res.send('request dengan method PUT')
})

app.delete('/contoh', (req, res) => {
    res.send('request dengan method DELETE')
})

app.patch('/contoh', (req, res) => {
    res.send('request dengan method PATCH')
})

app.all('/universal', (req, res) => res.send(`Artikel ke ${req.method}`))
//routing dinamis
//1. Menggunakan params
app.get('/post/:id', (req, res) => res.send(`Artikel ke ${req.params.id}`))

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => console.log (`Server running at http://${hostname}:${port}`));