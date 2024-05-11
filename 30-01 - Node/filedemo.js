const fs = require('fs');
const path = require('path');

fs.readdir('./dirA',(err,files)=>{
    files.forEach(file=>{
        const filePath = path.join('./dirA',file) // ./dirA/first.txt
        fs.lstat(filePath,(err,stats)=>{
            if(stats.isDirectory()){
                const newPath = path.join('./dirB',file) //.dirB/first
                fs.mkdirSync(newPath,{recursive:true})
                fs.readdir(filePath,(err,subFiles)=>{
                    if(err) throw err;
                    subFiles.forEach(subFile=>{
                        fs.copyFile(path.join(filePath,subFile),path.join(newPath,subFile),(err)=>{
                            if(err) throw err;
                        })
                    })
                })
            }
            else{
                fs.copyFile(path.join(filePath),path.join('./dirB',file),(err)=>{ //.dirb/first.txt
                    if(err) throw err;
                })
            }
        })
    })
})