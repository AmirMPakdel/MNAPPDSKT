const FileDirAccess = require("../lib/FileDirAccess");
const DatabaseCore = require("../lib/DatabaseCore");
const Page = require("../lib/Page");
const { showError } = require("../utils/error");
const AddCrouse = require("./addCourse");
const Network = require("../lib/Network");
const statics = require("../utils/statics");
const { getPlatform, getAppVersion } = require("../utils/os");
const { ipcMain, shell } = require("electron");

class Splash extends Page{

    async onStart(){

        ipcMain.handle("splash:retry_connection", this.retryConnection);

        ipcMain.handle("splash:continue_without_update", this.continueWithoutUpdate);

        ipcMain.handle("splash:open_update_url", this.openUpdateUrl)

        let fileDirAccess = new FileDirAccess();
        let fileDirAccess_check_res = await fileDirAccess.check();

        if(fileDirAccess_check_res.error){
            showError(configApp_check_res.error);
            return;
        }

        let dbcore = new DatabaseCore();
        let dbcore_check_res = await dbcore.check();

        if(dbcore_check_res.error){
            showError(dbcore_check_res.error);
            return;
        }

        setTimeout(()=>{
            this.checkVersion();
        }, 1000)
        
    }

    onDestroy(){

        console.log("splash window destroyed!");
    }

    checkVersion = ()=>{

        let params = {
            platform: getPlatform(),
            app_version: getAppVersion(),
        }; 

        Network.post(statics.urls.CHECK_VERSION, params, {}, (err, res)=>{

            if(!err){

                if(res.result_code==statics.SC.SUCCESS){

                    let addCourse = new AddCrouse(this.mainWindow, "addCourse");
                    addCourse.load();

                }else if(res.result_code==statics.SC.SHOULD_UPDATE){

                    this.mainWindow.webContents.send("splash:show_update_modal", res.data);

                }else{
                    showError(err);
                    return;    
                }

            }else if(err == "timeout"){

                this.mainWindow.webContents.send("splash:failed_connection");                

            }else{
                showError(err.code);
                return;
            }
        });
    }

    retryConnection = ()=>{

        setTimeout(()=>{
            this.checkVersion();
        }, 1000);
    }

    openUpdateUrl = (event, url)=>{

        shell.openExternal(url);
    }

    continueWithoutUpdate = ()=>{

        let addCourse = new AddCrouse(this.mainWindow, "addCourse");
        addCourse.load();
    }
}

module.exports = Splash;