const Joi = require("joi");

const validateSeatType = (seatType) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(seatType);
}

module.exports = { validateSeatType };