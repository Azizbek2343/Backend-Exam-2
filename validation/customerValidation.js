const Joi = require("joi");

const validateCustomer = (customerData) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        phone: Joi.string().min(7).required(),
        hashed_password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        birth_date: Joi.date().required(),
        gender_id: Joi.number().integer().required(),
        lang_id: Joi.number().integer().required(),
        hashed_refresh_token: Joi.string().allow(null, ""),
    });

    return schema.validate(customerData);
};

module.exports = { validateCustomer };