require("dotenv").config()
const path = require('path');


const publicDir = path.join(__dirname + "/../", process.env.PUBLIC_URL);
const useDir = (dir) => {
    return path.join(publicDir, dir)
}

module.exports = {
    useDir,
    publicDir
}