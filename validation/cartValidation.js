const Joi = require("joi");

const validateCart = (cartData) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        fineshedAt: Joi.date().allow(null, ""),
        status_id: Joi.number().integer().required(),
    });

    return schema.validate(cartData);
};

module.exports = { validateCart };