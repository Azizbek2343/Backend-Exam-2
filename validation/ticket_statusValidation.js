const Joi = require("joi");

const validateTicketStatus = (ticketStatus) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(ticketStatus);
}

module.exports = { validateTicketStatus };