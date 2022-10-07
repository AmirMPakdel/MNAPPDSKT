const { getConfigDir } = require("../utils/fs");
const fs = require("fs");
const { createBrotliCompress } = require("zlib");

class FileDirAccess{


    constructor(){

        this.confpath = getConfigDir();
    }

    /**
     * 
     * @returns {Promise<{error:Error|null}>}
     */
    check(){

        return new Promise((resolve, reject)=>{

            fs.access(this.confpath, fs.constants.R_OK | fs.constants.W_OK, (err)=>{

                if(err){
    
                    fs.mkdir(this.confpath, (err2)=>{
    
                        if(err2){
                            
                            resolve({error:err2});

                        }else{

                            resolve({error:null});
                        }
    
                    });
    
                }else{
                    
                    resolve({error:null});
                }
            });

        });
    }
}

module.exports = FileDirAccess;