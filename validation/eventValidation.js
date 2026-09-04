const Joi = require("joi");

const validateEvent = (eventData) => {
    const schema = Joi.object({
        name: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        photo: Joi.string().allow(null, "").optional(),
        start_date: Joi.date().required(),
        start_time: Joi.string().required(),
        finish_date: Joi.date().required(),
        finish_time: Joi.string().required(),
        info: Joi.string().allow(null, "").optional(),
        event_type_id: Joi.number().integer().required(),
        human_category_id: Joi.number().integer().required(),
        venue_id: Joi.number().integer().required(),
        lang_id: Joi.number().integer().required(),
        release_date: Joi.date().allow(null).optional(),
    });

    return schema.validate(eventData);
};

module.exports = { validateEvent };