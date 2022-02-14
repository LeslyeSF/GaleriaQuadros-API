// import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { connection } from '../database.js';

export async function signUp(req, res) {
    const user = req.body;

    try {
        const db = await connection({ column: 'users' });
        const sameEmail = await db.findOne({ email: user.email });

        if (sameEmail) {
            res.sendStatus(409);
            return;
        }

        const hashPassword = bcrypt.hashSync(user.password, 10);

        await db.insertOne({ ...user, password: hashPassword });

        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

function generateToken({ userId }) {
    const idUser = userId;
    const key = process.env.JWT_SECRET;
    const config = { expiresIn: 60 * 60 * 24 * 2 }; // 2 dias em segundos

    const token = jwt.sign({ idUser }, key, config);
    return token;
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
        const token = generateToken({ userId: user._id });

        await db.deleteMany({ idUser: new ObjectId(user._id) });

        await db.insertOne({ token, idUser: user._id });

        res.send(token);
    } catch (error) {
        res.sendStatus(500);
    }
}
