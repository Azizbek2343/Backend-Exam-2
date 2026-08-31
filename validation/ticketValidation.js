const Joi = require("joi");

const validateTicket = (ticketData) => {
    const schema = Joi.object({
        event_id: Joi.number().integer().required(),
        seat_id: Joi.number().integer().required(),
        price: Joi.number().required(),
        service_fee: Joi.number().required(),
        status_id: Joi.number().integer().required(),
        ticket_type_id: Joi.number().integer().required(),
    });

    return schema.validate(ticketData);
};

module.exports = { validateTicket };