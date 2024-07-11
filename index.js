require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const { publicDir, useDir } = require("./src/getDir");
const app = express();
const path = require('path');
const nomencladores = require("./src/db/nomen.json");
const { mkdir, exist, write, read } = require("./src/resorces");
const { log } = require("console");
const { get_id, get_db } = require("./src/maindb");




(async() => {
    for (let i = 0; i < nomencladores.length; i++) {
        const path_db = path.join(__dirname, '/src/db/data/' + nomencladores[i] + ".json");
        if (!exist(path_db)) {
            await write(path_db, JSON.stringify([]))
        }
    }
})()





app.use(bodyParser.json());
app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(useDir('index.html'));
});




app.get('/create/nomencladores', (req, res) => {
    res.json({ data: nomencladores })
});

app.post('/create', async(req, res) => {

    const base = './src/db/data/' + req.body.type + ".json";
    const id = isNaN(parseInt(req.body.id)) ? get_id() : parseInt(req.body.id);
    try {
        const data = JSON.parse((await read(base)).toString());
        req.body.id = id;
        data.push(req.body)
        await write(base, JSON.stringify(data))
        res.status(200).json({ msj: "Saved" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msj: error })
    }

});

app.get('/create', (req, res) => {
    res.sendFile(useDir('create.html'));
});


app.get('/update/:id', (req, res) => {
    res.sendFile(useDir('update_item.html'));
});


app.put('/update', async(req, res) => {

    try {
        const path_db = path.join(__dirname, './src/db/data/' + req.body.type + ".json");
        let db = JSON.parse((await read(path_db)).toString());
        const found = db.filter(arr => arr.id == req.body.id)[0];
        const i = db.indexOf(found);

        if (i !== -1) {
            db[i] = req.body;
            await write(path_db, JSON.stringify(db))
            res.status(200).json({})
        } else {
            res.status(404).json({})
        }



    } catch (error) {
        res.status(500).json({})
    }
});


app.get('/update', (req, res) => {
    res.sendFile(useDir('update_items.html'));
});



app.delete('/delete/', async(req, res) => {
    try {
        const path_db = path.join(__dirname, './src/db/data/' + req.query.type + ".json");
        let db = JSON.parse((await read(path_db)).toString());
        db = db.filter(arr => arr.id != req.query.id);
        await write(path_db, JSON.stringify(db))
        res.status(200).json({ msj: "Deleted!" })
    } catch (error) {
        res.status(500).json({ msj: error })
    }


});


app.get('/delete', (req, res) => {
    res.sendFile(useDir('delete.html'));
});


app.get('/get/:type', async(req, res) => {
    try {
        const path_db = path.join(__dirname, './src/db/data/' + req.params.type + ".json");
        const db = JSON.parse((await read(path_db)).toString());


        res.status(200).json({ data: db, type: req.params.type })
    } catch (error) {
        res.status(500).json({ data: error })
    }
});

app.get('/get/item/:id', async(req, res) => {
    try {
        let db = await get_db();
        db = db.filter(arr => arr.id == req.params.id)[0];
        res.status(200).json({ data: db, })
    } catch (error) {
        res.status(500).json({ data: error })
    }
});

app.get('/show', (req, res) => {
    res.sendFile(useDir('index.html'));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});