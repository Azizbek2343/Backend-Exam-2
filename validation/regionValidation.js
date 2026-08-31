const Joi = require("joi");

const validateRegion = (region) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(region);
}

module.exports = { validateRegion };