import { connection } from '../database.js';

export async function verifyTokenMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {
        const db = await connection({ column: 'sessions' });
        const sessionVerify = await db.findOne({ token });

        if (!sessionVerify) {
            res.sendStatus(404);
            return;
        }

        res.locals.user = sessionVerify.idUser;
    } catch (err) {
        res.status(500).send(err);
        return;
    }

    next();
}
