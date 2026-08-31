const Joi = require("joi");

const validateDeliveryMethod = (deliveryMethodData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
    });

    return schema.validate(deliveryMethodData);
}

module.exports = { validateDeliveryMethod };