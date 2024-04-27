const mongoose = require('mongoose');
const MoviesDetail = require('./src/model/MoviesDetail')
mongoose.connect('mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/MovieDataBase?retryWrites=true&w=majority&appName=chat');

async function run(){
    const data = await MoviesDetail.find({});
    console.log(data);

}

run()