const Joi = require("joi");

const validateCartItem = (cartItemData) => {
    const schema = Joi.object({
        ticket_id: Joi.number().integer().required(),
        cart_id: Joi.number().integer().required(),
    });

    return schema.validate(cartItemData);
};

module.exports = { validateCartItem };