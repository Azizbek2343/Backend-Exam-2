const Joi = require("joi");

const validateBooking = (bookingData) => {
    const schema = Joi.object({
        cart_id: Joi.number().integer().required(),
        fineshed: Joi.date().allow(null, ""),
        payment_method_id: Joi.number().integer().required(),
        delivery_method_id: Joi.number().integer().required(),
        discount_id: Joi.number().integer().allow(null),
        status_id: Joi.number().integer().required(),
    });

    return schema.validate(bookingData);
};

module.exports = { validateBooking };