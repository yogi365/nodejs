// const date = require('./Component/Modules/dateTime');
// console.log(date.date());

// setInterval(()=>{
//     console.log(date.time());
// },1000);

const fs = require('fs');
// fs.readFile('./dummy.txt',(error,data)=>{
//     if(error){
//         console.error(error);
//         return;        
//     }
//     console.log(data.toString());
// })

// fs.writeFile('./dummy.txt',"Writing to the text file from node",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Data Written Successfully")
//     }
// })

// fs.appendFile('./dummy.txt',"new data", (err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('Success')
//     }
// })

// fs.unlink('./dummy.txt',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('File deleted')
//     }
// })

// fs.rename('./dummy.txt','./demo.txt',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('file renamed')
//     }
// })

// fs.readFile('./demo.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         fs.appendFile('./dummy.txt',data,(err)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 console.log('File Written')
//             }
//         })
//     }
// })

fs.copyFile('./demo.txt','./dummy.txt',(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('copied')
    }
})