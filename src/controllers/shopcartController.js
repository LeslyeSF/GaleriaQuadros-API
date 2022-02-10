import { connection } from '../database.js';
import * as productController from './productController.js';

async function postNewProductToCart(req, res) {
    const { id } = req.params;
    const userId = res.locals.user;

    try {
        const product = await productController.findProductById({ id });

        if (!product) {
            return res.sendStatus(404);
        }

        const db = await connection({ column: 'shopcarts' });

        await db.insertOne({
            userId,
            productId: id,
        });

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    postNewProductToCart,
};
