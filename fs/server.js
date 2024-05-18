const fs = require("fs");
fs.writeFile("./text.json", "123", (err) => {
    if (err)
        console.log(err);
    else
        console.log("succ");
})

//to write content in file async

let data=fs.writeFileSync("./text.json","78");
console.log(data);

//to write content sync


fs.appendFile("./text.json", "123", (err) => {
    if (err)
        console.log(err);
    else
        console.log("appended succ");
})

//to append data async

fs.appendFileSync("./text.json","78");

//to append data sync


fs.copyFile("./text.json","./abc.json",(err)=>{
    if (err)
    console.log(err);
else
    console.log("copy");
})

//to copy in file async

fs.copyFile("./text.json","./abc.json");

//to copy file sync

fs.rename("./abc.jon","./def.json",(err)=>{
    if (err)
    console.log(err);
else
    console.log("copy");
})

// to rename file async

fs.rename("./abc.jon","./def.json");

//to rename file sync

fs.readFile("./abc.jon","utf-8",(err,data)=>{
    if (err)
    console.log(err);
else
    console.log(data);
})

//to read file async

let res=fs.readFileSync("./abc.json","utf-8");
console.log(res);

//to read file sync


//assignment to read given folder recursively





