const Joi = require("joi");

const validateHumanCategory = (humanCategory) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        start_age: Joi.number().integer().required(),
        finish_age: Joi.number().integer().required(),
        gender_id: Joi.number().integer().required(),
    });

    return schema.validate(humanCategory);
}

module.exports = { validateHumanCategory };