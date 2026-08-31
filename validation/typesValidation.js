const Joi = require("joi");

const validateTypes = (types) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(types);
}

module.exports = { validateTypes };