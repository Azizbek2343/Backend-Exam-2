const Joi = require("joi");

const validateCustomerAddress = (customerAddressData) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        name: Joi.string().min(2).required(),
        region_id: Joi.number().integer().required(),
        district_id: Joi.number().integer().required(),
        street: Joi.string().min(2).required(),
        house: Joi.string().required(),
        flat_id: Joi.number().integer().required(),
        location: Joi.string().required(),
        post_index: Joi.string().required(),
        info: Joi.string().allow(null, ""),
    });

    return schema.validate(customerAddressData);
};

module.exports = { validateCustomerAddress };