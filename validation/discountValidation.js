const Joi = require("joi");

const validateDiscount = (discountData) => {
    const schema = Joi.object({
        discount: Joi.string().min(2).required(),
        finish_date: Joi.date().required(),
    });

    return schema.validate(discountData);
}

module.exports = { validateDiscount };