import sgMail from '@sendgrid/mail';
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
export async function checkout(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    const products = req.body;

    try {
        const dbSession = await connection({ column: 'sessions' });
        const { idUser } = await dbSession.findOne({ token });
        const dbOrders = await connection({ column: 'orders' });
        await dbOrders.insertOne({ idUser, products });
        sgMail.setApiKey('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');
        const msg = {
            to: 'leslyesoares@gmail.com',
            from: 'leslyesf@outlook.com',
            subject: 'Compra realizada com sucesso',
            html: 'A compra de seus quadros foi realizada com sucesso!',
        };

        await sgMail.send(msg)
            .then(() => console.log('Mensagem enviada'))
            .catch(() => console.log('Mensagem n enviada'));
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}
