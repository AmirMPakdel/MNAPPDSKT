const Model = require("../lib/Model");

let a = Model.genUniqueID;

let list = [];

for(let i=0; i<=9000; i++){

    let s=a();
    console.log(s);
    list.push(s);
}

list.forEach((e,i)=>{

    list.forEach((e2,i2)=>{

        if(e.length != e2.length){
            console.log("holyshat!");
            console.log(e+"->index:"+i+"->length:"+e.length);
            console.log(e2+"->index:"+i2+"->length:"+e2.length);
        }

        if(e === e2 && i2 !== i){
            console.log("wtf");
            console.log(e+"->index:"+i);
            console.log(e2+"->index:"+i2);
        }
    });
});