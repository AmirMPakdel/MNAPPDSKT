const { app } = require("electron");
const { isWindows, isMac } = require("./os");
const path = require("path");


function getConfigDir(){

    return path.join(app.getPath("appData"), "com.mnapp");
}

function getDBFilePath(){

    return path.join(app.getPath("appData"), "com.mnapp/dmdata");
}

module.exports = {
    getConfigDir,
    getDBFilePath,

}