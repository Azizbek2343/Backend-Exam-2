const Joi = require("joi");

const validateLang = (lang) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(lang);
}

module.exports = { validateLang };