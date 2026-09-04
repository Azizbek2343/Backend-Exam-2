const { District, Region } = require("../models");
const { validateDistrict } = require("../validation/districtValidation");
const { Op } = require("sequelize");

const formatDistrictResponse = (district) => {
    if (!district) return null;
    const json = district.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        region: json.region || json.Region || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Region, as: "region" }
];

exports.createDistrict = async (req, res) => {
    const { error } = validateDistrict(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let district = await District.create(req.body);
        district = await District.findByPk(district.id, { include: includeOptions });
        res.status(201).send(formatDistrictResponse(district));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getDistricts = async (req, res) => {
    try {
        const districts = await District.findAll({ include: includeOptions });
        const formatted = districts.map(d => formatDistrictResponse(d));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id, { include: includeOptions });
        if (!district) return res.status(404).send("District not found");
        res.status(200).send(formatDistrictResponse(district));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateDistrict = async (req, res) => {
    const { error } = validateDistrict(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let district = await District.findByPk(req.params.id);
        if (!district) return res.status(404).send("District not found");
        
        await district.update(req.body);
        district = await District.findByPk(district.id, { include: includeOptions });
        res.status(200).send(formatDistrictResponse(district));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteDistrict = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id, { include: includeOptions });
        if (!district) return res.status(404).send("District not found");

        const deletedData = formatDistrictResponse(district);
        await district.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchDistricts = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const districts = await District.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = districts.map(d => formatDistrictResponse(d));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};