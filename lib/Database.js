const { showError } = require("../utils/error");
const DatabaseCore = require("./DatabaseCore");

class Database {

    /**
     * 
     * @param {DatabaseCore} dbcore 
     */
    constructor(dbcore){

        this.dbcore = dbcore;
        this.version = 0;
        this.user = [];
        this.courses = [];
        this.downloads = [];
    }

    /**
     * 
     * @returns {Promise<{error:Error|null}>}
     */
    load(){
        return new Promise((resolve, reject)=>{

            this.dbcore.read().then(res=>{

                if(res.error){

                    resolve({error:res.error});

                }else{

                    let db_data = res.data;
                    this.version = db_data.version;
                    this.user = db_data.user;
                    this.courses = db_data.courses;
                    this.downloads = db_data.downloads;
                    resolve({error:null});
                }
            });
        });
    }

    /**
     * 
     * @returns {Promise<{error:Error|null}>}
     */
    save(){
        return new Promise((resolve, reject)=>{

            let db_data = {
                version:this.version,
                user:this.user,
                courses:this.courses,
                downloads:this.downloads,
            }

            this.dbcore.write(db_data).then(res=>{

                resolve(res);
            });
        });
    }
}

module.exports = Database;