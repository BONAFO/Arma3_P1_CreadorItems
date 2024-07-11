const nomencladores = require("./db/nomen.json");
const path = require('path');
const { exist, read } = require("./resorces");


const get_db = async() => {
    let main_db = [];
    for (let i = 0; i < nomencladores.length; i++) {
        const path_db = path.join(__dirname, './db/data/' + nomencladores[i] + ".json");
        if (exist(path_db)) {
            const db = JSON.parse((await read(path_db)).toString());
            main_db = main_db.concat(db);

        }


    }


    return main_db
}


const get_id = () => {
    main_db.sort((a, b) => a.id - b.id);

    if (main_db.length == 0) {
        return 0
    } else {
        return parseInt(main_db[main_db.length - 1].id) + 1
    }
}

module.exports = { get_id, get_db }