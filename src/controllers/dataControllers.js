import { connection } from '../database.js';
import data from '../data/index.js';

export async function getData(req, res) {
    try {
        const db = await connection({ column: 'products' });

        const paintings = await db.find({}).toArray();
        res.status(200).send(paintings);
    } catch {
        res.sendStatus(500);
    }
}
export async function insertData(req, res) {
    try {
        const db = await connection({ column: 'products' });
        await db.insertMany(data);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}
