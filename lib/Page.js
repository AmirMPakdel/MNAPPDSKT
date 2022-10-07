const { BrowserWindow } = require("electron");
const env = require("../env");

class Page {

    #path;

    /**
     * 
     * @param {BrowserWindow} mainWindow 
     */
     constructor(mainWindow, path){
        this.mainWindow = mainWindow;
        this.#path = path;
    }

    load(){

        if(env.loadFromLocalServe){

            this.mainWindow.loadURL("http://localhost:3000/"+this.#path);

        }else{

            this.mainWindow.loadFile("./public/"+this.#path+".html");
        }
        
        this.mainWindow.webContents.once("did-finish-load", ()=>{

            this.onStart();
        });
    }

    onStart(){

    }
}

module.exports = Page;