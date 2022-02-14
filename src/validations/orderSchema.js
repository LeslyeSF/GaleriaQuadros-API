import joi from 'joi';

const orderSchema = joi.object({
    list: joi.array().required(),
    amount: joi.string().required(),
});

export default orderSchema;
