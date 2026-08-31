const Joi = require("joi");

const validateVenueTypes = (venueTypes) => {
    const schema = Joi.object({
        venueId: Joi.number().integer().required(),
        typeId: Joi.number().integer().required(),
    });

    return schema.validate(venueTypes);
}

module.exports = { validateVenueTypes };