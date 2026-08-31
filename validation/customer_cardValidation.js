const Joi = require("joi");

const validateCustomerCard = (customerCardData) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        name: Joi.string().min(2).required(),
        phone: Joi.string().min(7).required(),
        number: Joi.string().min(12).max(19).required(),
        year: Joi.string().length(2).required(),
        month: Joi.string().length(2).required(),
        is_active: Joi.boolean().required(),
        is_main: Joi.boolean().required(),
    });

    return schema.validate(customerCardData);
};

module.exports = { validateCustomerCard };