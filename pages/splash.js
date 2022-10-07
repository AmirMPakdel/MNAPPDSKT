const FileDirAccess = require("../lib/FileDirAccess");
const DatabaseCore = require("../lib/DatabaseCore");
const Page = require("../lib/Page");
const { showError } = require("../utils/error");
const AddCrouse = require("./addCourse");
const Network = require("../lib/Network");
const statics = require("../utils/statics");
const { getPlatform, getAppVersion } = require("../utils/os");

class Splash extends Page{

    can_continue = false;

    async onStart(){

        setTimeout(()=>{

            if(this.can_continue){
                
                let addCourse = new AddCrouse(this.mainWindow, "addCourse");
                addCourse.load();

            }else{

                this.can_continue = "proceed";
            }

        },2000);

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

        let params = {
            platform: getPlatform(),
            app_version: getAppVersion(),
        };

        let config = {
            timeout:500
        };

        Network.post(statics.urls.CHECK_VERSION, params, config, (err, res)=>{

            if(!err){
                
                console.log(res);

                this.can_continue = true;

            }else if(err == "timeout"){

                console.log("timeout");

            }else{
                showError(err.code);
                return;
            }
        });

        
    }
}

module.exports = Splash;