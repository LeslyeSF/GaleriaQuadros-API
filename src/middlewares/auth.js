import logInSchema from "../validations/logInSchema.js";

export function logInValidationMiddleware(req, res, next) {
    const { email, password} = req.body;

    const validation = logInSchema.validate({ email, password});
    console.log(validation)
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}