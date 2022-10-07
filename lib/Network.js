const axios = require('axios').default;
const statics = require("../utils/statics");

class Network {
    
    /**
     * 
     * @param {string} url 
     * @param {any} data 
     * @param {import('axios').AxiosRequestConfig} config 
     * @param {(err, data)=>{}} cb 
     */
    static post(url, data, config, cb){

        url = statics.domain+url;
        
        if(config.timeout === undefined){
            config.timeout = 5000;
        }

        axios.post(url, data, config).then(res=>{
    
            cb(null, res.data);
    
        }).catch(e=>{
    
            //ECONNABORTED for timeout
            //ENOTFOUND for no-connection
            if(e.code === "ECONNABORTED" || e.code === "ENOTFOUND"){
                cb("timeout", null);
            }else{
                cb(e, null);
            }
        });
    }
}

module.exports = Network;