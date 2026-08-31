const Joi = require("joi");

const validateTicketType = (ticketTypeData) => {
    const schema = Joi.object({
        ticket_type: Joi.string().min(2).required(),
    });

    return schema.validate(ticketTypeData);
};

module.exports = { validateTicketType };