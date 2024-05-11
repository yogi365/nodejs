const mongoose = require('mongoose');
const MoviesDetail = require('./src/models/MoviesDetail');
const uri = 'mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/test?retryWrites=true&w=majority&appName=chat'
mongoose.connect(uri);
const Users = require('./src/models/users');

async function run(){
    const data = await MoviesDetail.find({});
    // const data = await Users.where('age').gt(20).lt(25);
    // data[0].firstName = 'Ankit';
    // data[0].save();
    console.log(data)
}
run();