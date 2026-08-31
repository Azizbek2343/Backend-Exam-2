const Joi = require("joi");

const validatePaymentMethod = (paymentMethod) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(paymentMethod);
}

module.exports = { validatePaymentMethod };