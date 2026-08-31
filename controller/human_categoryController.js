const { HumanCategory } = require("../models");
const { validateHumanCategory } = require("../validation/human_categoryValidation");
const { Op } = require("sequelize");

exports.createHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const humanCategory = await HumanCategory.create(req.body);
        res.status(201).send(humanCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHumanCategories = async (req, res) => {
    try {
        const humanCategories = await HumanCategory.findAll();
        res.status(200).send(humanCategories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("Human category not found");
        res.status(200).send(humanCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("Human category not found");

        await humanCategory.update(req.body);
        res.status(200).send(humanCategory);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteHumanCategory = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("Human category not found");

        const deletedData = humanCategory.toJSON();
        await humanCategory.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchHumanCategories = async (req, res) => {
    try {
        console.log("Query received:", req.query.query);
        
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const humanCategories = await HumanCategory.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(humanCategories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};