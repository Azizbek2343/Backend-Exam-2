const Joi = require("joi");

const validateFlat = (flatData) => {
    const schema = Joi.object({
        etaj: Joi.number().integer().required(),
        condition: Joi.string().min(2).required(),
    });

    return schema.validate(flatData);
}

module.exports = { validateFlat };