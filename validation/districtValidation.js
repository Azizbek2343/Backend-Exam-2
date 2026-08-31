const Joi = require("joi");

const validateDistrict = (districtData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        region_id: Joi.number().integer().required(),
    });

    return schema.validate(districtData);
};

module.exports = { validateDistrict };