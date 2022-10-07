const { BrowserWindow } = require("electron");
const env = require("../env");

class Page {

    #path;
    #loaded;
    /**
     * 
     * @param {BrowserWindow} mainWindow 
     */
     constructor(mainWindow, path){
        this.mainWindow = mainWindow;
        this.#path = path;
        this.#loaded = false;
    }

    load(){

        if(env.loadFromLocalServe){

            this.mainWindow.loadURL("http://localhost:3000/"+this.#path);

        }else{

            this.mainWindow.loadFile("./public/"+this.#path+".html");
        }
        
        this.mainWindow.webContents.addListener("did-finish-load", this.didFinishedLoad);
    }

    didFinishedLoad = ()=>{

        if(this.#loaded){

            this.mainWindow.webContents.removeListener("did-finish-load", this.didFinishedLoad);

            this.onDestroy();

        }else{

            this.#loaded = true;
            
            setTimeout(()=>{

                this.onStart();

            }, 500);
        }
    }

    onStart(){

    }

    onDestroy(){
        
    }
}

module.exports = Page;