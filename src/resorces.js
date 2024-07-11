const fs = require('fs');
const util = require('util');

module.exports = {

    mkdir: util.promisify(fs.mkdir),
    exist: fs.existsSync,
    stat: util.promisify(fs.stat),
    write: util.promisify(fs.writeFile),
    readdir: util.promisify(fs.readdir),
    read: util.promisify(fs.readFile),
};