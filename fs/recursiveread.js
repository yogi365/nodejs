const fs=require("fs");
const path1=require("path");

function read(path){
   fs.readdir(path,  (err, files) => {  
        if (err) 
          console.log(err); 
        else { 
          files.forEach(file => { 
            const stats = fs.statSync(path+file);
            if (stats.isFile()) {
              if(path1.extname(file)==".js")
              console.log(`${file} is a file.`);
            } else if (stats.isDirectory()) {
              console.log("dirc");
                read(path+file+"/");
            } 
          }) 
        } 
      }) 
    }
    
    read("./")