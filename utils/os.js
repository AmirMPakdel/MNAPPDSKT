const env = require("../env");


function isMac(){

    if(process.platform === "darwin"){
        return true;
    }
    return false;
}

function isWindows(){

    if(process.platform === "win32"){
        return true;
    }
    return false;
}

function getPlatform(){

    if(isMac()){
        return "mac";
    }else if(isWindows()){
        return "windows";
    }
}

function getAppVersion(){

    return env.app_version.toString();
}

module.exports = {
    isMac,
    isWindows,
    getPlatform,
    getAppVersion,
}