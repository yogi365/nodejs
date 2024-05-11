const fs = require('fs');
fs.readFile('./Component/Model/question.json',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
         let questions = JSON.parse(data)
            questions.data.forEach(question => {
                    console.log(question)
            });
    }
})