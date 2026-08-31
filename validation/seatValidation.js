const Joi = require("joi");

const validateSeat = (seat) => {
    const schema = Joi.object({
        sector_id: Joi.number().integer().required(),
        row_number: Joi.number().integer().required(),
        number: Joi.number().integer().required(),
        venue_id: Joi.number().integer().required(),
        seat_type_id: Joi.number().integer().required(),
        location_in_schema: Joi.string().optional().allow(null, ""),
    });

    return schema.validate(seat);
}

module.exports = { validateSeat };