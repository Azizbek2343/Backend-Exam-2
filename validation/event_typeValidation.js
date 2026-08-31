const Joi = require("joi");

const validateEventType = (eventType) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        parent_event_type_id: Joi.number().integer().allow(null),
    });

    return schema.validate(eventType);
}

module.exports = { validateEventType };