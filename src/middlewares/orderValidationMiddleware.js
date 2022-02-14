import orderSchema from '../validations/orderSchema.js';

export function orderValidationMiddleware(req, res, next) {
    const products = req.body;

    const validation = orderSchema.validate(products);

    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}
