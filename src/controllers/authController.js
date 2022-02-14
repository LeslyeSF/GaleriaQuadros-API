import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { connection } from '../database.js';

export async function signUp(req, res) {
    const user = req.body;

    const db = await connection({ column: 'users' });
    const sameEmail = await db.findOne({ email: user.email });

    if (sameEmail) {
        res.sendStatus(409);
        return;
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    try {
        await db.insertOne({ ...user, password: hashPassword });

        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function logIn(req, res) {
    const { email, password } = req.body;

    try {
        let db = await connection({ column: 'users' });
        const user = await db.findOne({ email });

        if (!user) {
            res.sendStatus(401);
            return;
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.sendStatus(401);
            return;
        }

        db = await connection({ column: 'sessions' });
        const token = uuid();
        await db.insertOne({ token, idUser: user._id });

        res.status(200).send({ token, user });
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function logOut(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    try {
        const db = await connection({ column: 'sessions' });
        await db.deleteOne({ token });
        res.send(200);
        console.log('saiu');
    } catch (err) {
        res.status(500).send(err);
    }
}
