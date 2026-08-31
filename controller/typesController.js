const { Types } = require("../models");
const { validateTypes } = require("../validation/typesValidation");
const { Op } = require("sequelize");

exports.createTypes = async (req, res) => {
    const { error } = validateTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const types = await Types.create(req.body);
        res.status(201).send(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTypes = async (req, res) => {
    try {
        const types = await Types.findAll();
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTypesById = async (req, res) => {
    try {
        const types = await Types.findByPk(req.params.id);
        if (!types) return res.status(404).send("Types not found");
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTypes = async (req, res) => {
    const { error } = validateTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const types = await Types.findByPk(req.params.id);
        if (!types) return res.status(404).send("Types not found");

        await types.update(req.body);
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTypes = async (req, res) => {
    try {
        const types = await Types.findByPk(req.params.id);
        if (!types) return res.status(404).send("Types not found");

        const deletedData = types.toJSON();
        await types.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchTypes = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const types = await Types.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
};