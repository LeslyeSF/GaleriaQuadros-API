import userSchema from '../validations/userSchema.js';

export function userValidationMiddleware(req, res, next) {
    const user = req.body;

    const validation = userSchema.validate(user);
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}
