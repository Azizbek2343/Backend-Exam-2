const { VenueTypes, Venue, Types } = require("../models");
const { validateVenueTypes } = require("../validation/venue_typesValidation");
const { Op } = require("sequelize");

const formatVenueTypeResponse = (venueType) => {
    if (!venueType) return null;
    const json = venueType.toJSON();

    return {
        id: json.id,
        venue: json.venue || null,
        type: json.type || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Venue, as: "venue" },
    { model: Types, as: "type" }
];

exports.createVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let venueTypes = await VenueTypes.create(req.body);
        venueTypes = await VenueTypes.findByPk(venueTypes.id, { include: includeOptions });
        res.status(201).send(formatVenueTypeResponse(venueTypes));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findAll({ include: includeOptions });
        const formatted = venueTypes.map(v => formatVenueTypeResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenueTypesById = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id, { include: includeOptions });
        if (!venueTypes) return res.status(404).send("Venue types not found");
        res.status(200).send(formatVenueTypeResponse(venueTypes));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("Venue types not found");

        await venueTypes.update(req.body);
        
        venueTypes = await VenueTypes.findByPk(venueTypes.id, { include: includeOptions });
        res.status(200).send(formatVenueTypeResponse(venueTypes));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id, { include: includeOptions });
        if (!venueTypes) return res.status(404).send("Venue types not found");

        const deletedData = formatVenueTypeResponse(venueTypes);
        await venueTypes.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchVenueTypes = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const whereCondition = {};
        if (!isNaN(query)) {
            whereCondition[Op.or] = [
                { venueId: query },
                { typeId: query }
            ];
        }

        const venueTypes = await VenueTypes.findAll({
            where: whereCondition,
            include: includeOptions
        });

        const formatted = venueTypes.map(v => formatVenueTypeResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};