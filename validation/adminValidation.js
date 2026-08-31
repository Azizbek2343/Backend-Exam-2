const Joi = require("joi");

const validateAdmin = (adminData) => {
    const schema = Joi.object({
        name: Joi.string().allow(null, ""),
        login: Joi.string().required(),
        hashed_password: Joi.string().required(),
        is_active: Joi.boolean().required(),
        is_creator: Joi.boolean().required(),
        hashed_refresh_token: Joi.string().allow(null, ""),
    });

    return schema.validate(adminData);
};

module.exports = { validateAdmin };