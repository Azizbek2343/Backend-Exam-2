const { HumanCategory, Gender } = require("../models");
const { validateHumanCategory } = require("../validation/human_categoryValidation");
const { Op } = require("sequelize");

const formatHumanCategoryResponse = (humanCategory) => {
    if (!humanCategory) return null;
    const json = humanCategory.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        gender: json.gender || json.Gender || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Gender, as: "gender" }
];

exports.createHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let humanCategory = await HumanCategory.create(req.body);
        humanCategory = await HumanCategory.findByPk(humanCategory.id, { include: includeOptions });
        res.status(201).send(formatHumanCategoryResponse(humanCategory));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHumanCategories = async (req, res) => {
    try {
        const humanCategories = await HumanCategory.findAll({ include: includeOptions });
        const formatted = humanCategories.map(h => formatHumanCategoryResponse(h));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id, { include: includeOptions });
        if (!humanCategory) return res.status(404).send("Human category not found");
        res.status(200).send(formatHumanCategoryResponse(humanCategory));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("Human category not found");

        await humanCategory.update(req.body);
        humanCategory = await HumanCategory.findByPk(humanCategory.id, { include: includeOptions });
        res.status(200).send(formatHumanCategoryResponse(humanCategory));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteHumanCategory = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id, { include: includeOptions });
        if (!humanCategory) return res.status(404).send("Human category not found");

        const deletedData = formatHumanCategoryResponse(humanCategory);
        await humanCategory.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchHumanCategories = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const humanCategories = await HumanCategory.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = humanCategories.map(h => formatHumanCategoryResponse(h));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};