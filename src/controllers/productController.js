import { ObjectId } from 'mongodb';
import { connection } from '../database.js';

async function findProductById({ id }) {
    const db = await connection({ column: 'products' });

    const product = await db.findOne({ _id: new ObjectId(id) });

    return product;
}

async function getProductById(req, res) {
    const { id } = req.params;

    try {
        const product = await findProductById({ id });

        if (!product) {
            return res.sendStatus(404);
        }

        return res.send(product);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    getProductById,
    findProductById,
};
