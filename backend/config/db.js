require('dotenv').config({path: './.env'});
const { MongoClient } = require('mongodb');

const urlConfig = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@data.r6ndl.mongodb.net/?retryWrites=true&w=majority&appName=data`;

const db = async () =>{
    const client = new MongoClient(urlConfig);
    try{
        await client.connect();
        console.log('Kết nối thành công đến MongoDB');
        return await client;
    }catch(e){console.error(e);}
}

module.exports = db;