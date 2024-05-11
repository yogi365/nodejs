const fs = require('fs');

// fs.readFile('./dummy.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data);
//     }
// })
// const data = fs.readFileSync('./dummy.txt','utf-8');
// console.log(data);

// fs.appendFile('./demo.txt','New data appended',
//                 (err)=>{
//                     if(err){
//                         console.log('error')
//                     }
//                     else{
//                         console.log('file written sucessfully');
//                     }
//                 })

// const data = fs.writeFileSync('./newFile.jpg','New file data');
// console.log(data);

// fs.unlink('./newFile.jpg',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('file deleted')
//     }
// })

// fs.mkdir('./newDir',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('directory created');
//     }
// })
const path = require('path');
fs.readdir('./',(err,files)=>{
    if(err) throw err;
    console.log(files);
    const filePath = path.join(__dirname,files[0])
    // console.log(filePath)
    // const data = fs.readFileSync(filePath,'utf-8');
    // console.log(data);
    // console.log(path.basename(files[0]))
})

// console.log(__dirname);



