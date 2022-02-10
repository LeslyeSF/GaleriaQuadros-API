import './setup.js';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function connection({ column }) {
    await mongoClient.connect();

    const db = mongoClient.db(process.env.DB_NAME).collection(column);
    return db;
}


export {
    connection,
};

