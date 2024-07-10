require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const { publicDir, useDir } = require("./src/getDir");
const app = express();

const nomencladores = require("./src/db/nomen.json");



app.use(express.static(publicDir));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(useDir('index.html'));
});




app.get('/create/nomencladores', (req, res) => {
    res.json({ data: nomencladores })
});

app.get('/create', (req, res) => {
    res.sendFile(useDir('create.html'));
});


app.get('/update', (req, res) => {
    res.sendFile(useDir('index.html'));
});



app.get('/delete', (req, res) => {
    res.sendFile(useDir('index.html'));
});


app.get('/show', (req, res) => {
    res.sendFile(useDir('index.html'));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});