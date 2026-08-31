const Joi = require("joi");

const validateVenue = (venues) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        address: Joi.string().required(),
        location: Joi.string().required(),
        site: Joi.string().required(),
        phone: Joi.string().required(),
        schema: Joi.string().required(),
        region_id: Joi.number().integer().required(),
        district_id: Joi.number().integer().required(),
    });

    return schema.validate(venues);
}

module.exports = { validateVenue };