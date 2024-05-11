const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
        
        "title": {
            type:String,
            require:true
        },
        "article": {
            type:String,
            require:true
        },
        "date": {
            type:Date,
            require:true,
            default:new Date().toLocaleDateString()
        },
        "image": {
            type:String,
            require:true
        },
        "author": {
            type:String,
            require:true
        },
        "authorId":{
            type:String
        }

        
}) 

const Article = mongoose.model('article',articleSchema);
module.exports = Article;