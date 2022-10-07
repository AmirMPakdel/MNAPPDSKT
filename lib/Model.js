const crypto = require("crypto");

class Model {

    static array_name;

    /**
     * 
     * @param {Database} db 
     */
    constructor(db){

        this.db = db;
    }

    static genUniqueID(){
        
        let id = Date.now()+"-"+crypto.randomUUID();
        let hash = crypto.createHash("sha256");
        hash.update(id);
        return hash.digest("base64");
    }

    static create(object){

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        this.db[this.array_name].push(object);
    }

    static find(where){

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        let li = this.db[this.array_name];

        let data = [];

        li.forEach((v,i)=>{

            let w_keys = Object.keys(where);
            let matches = true;

            w_keys.forEach(k=>{
                if(v[k] != where[k]){
                    matches = false;
                }
            });

            if(matches){
                data.push(v);
            }
        });

        return data;
    }

    static findOne(where){

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        let li = this.db[this.array_name];

        for(let i=0; i<li.length; i++){

            let w_keys = Object.keys(where);
            let matches = true;
            
            w_keys.forEach(k=>{
                if(li[i][k] != where[k]){
                    matches = false;
                }
            });

            if(matches){
                return li[i];
            }
        }

        return null;
    }

    static update(where, object){

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        let li = this.db[this.array_name];

        li.forEach((v,i)=>{

            let w_keys = Object.keys(where);
            let matches = true;

            w_keys.forEach(k=>{
                if(v[k] != where[k]){
                    matches = false;
                }
            });

            if(matches){
                Object.keys(object).forEach(k=>{
                    v[k] = object[k];
                });
            }
        });
    }

    static delete(where){

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        if(!this.db[this.array_name]){
            throw new Error(this.array_name+" not exists in db!");
        };

        let li = this.db[this.array_name];

        let newList = [];

        li.forEach((v,i)=>{

            let w_keys = Object.keys(where);
            let matches = true;

            w_keys.forEach(k=>{
                if(v[k] != where[k]){
                    matches = false;
                }
            });

            if(!matches){
                newList.push(v);
            }
        });

        this.db[this.array_name] = newList;
    }
}

module.exports = Model;