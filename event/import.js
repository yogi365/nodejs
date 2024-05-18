const data=require("./export.js");
//console.log(data);

data.eventEmitter.on("start",(a)=>{
    console.log(a);
    console.log("function runned");
});

data.log();


