const Joi = require("joi");

const validateSector = (sectorData) => {
    const schema = Joi.object({
        sector_name: Joi.string().min(2).required(),
    });

    return schema.validate(sectorData);
}

module.exports = { validateSector };