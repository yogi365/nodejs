const mongoose = require('mongoose');
const MoviesDetail = require('./src/model/MoviesDetail')
mongoose.connect('mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/MovieDataBase?retryWrites=true&w=majority&appName=chat');

async function run(){
    // const data = await MoviesDetail.where('id').eq(1);
    const data = await MoviesDetail.create({
        id:13,
        name:'Robot',
        rating:9.9,
        imdb_url:'https://www.imdb.com',
        image:'image url'
    })
    console.log(data);
}

run()