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

async function getProductsInShoppingCart(req, res) {
    const userId = res.locals.user;

    try {
        const db = await connection({ column: 'shopcarts' });

        const productsIds = await db.find({ userId }).toArray();

        if (!productsIds) {
            return res.send([]);
        }

        const productsInShoppingCart = [];
        let item = null;

        const promise = productsIds.map(async (product) => {
            item = await productController.findProductById({ id: product.productId });
            productsInShoppingCart.push(item);
        });

        await Promise.all(promise);

        return res.send(productsInShoppingCart);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function removeProductsFromShoppingCart(req, res) {
    const { id } = req.params;
    const userId = res.locals.user;

    try {
        const product = await productController.findProductById({ id });

        if (!product) {
            return res.sendStatus(404);
        }

        const db = await connection({ column: 'shopcarts' });

        await db.deleteOne({
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
    getProductsInShoppingCart,
    removeProductsFromShoppingCart,
};
