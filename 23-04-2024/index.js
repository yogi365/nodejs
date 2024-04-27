const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/?retryWrites=true&w=majority&appName=chat')

async function run(){
    await client.connect();
    const db = client.db('MovieDataBase');
    const collection = await db.collection('MoviesDetail').insertOne(
        {
            "id":14,
            "movie":"Forrest Gump",
            "rating":{"$numberDouble":"8.8"},
            "image":"images/forrest_gump.jpg",
            "imdb_url":"https://www.imdb.com/title/tt0109830/"
        }
    );
    // const data = await collection.find({}).toArray();
    console.log(collection);   
    
}
run();