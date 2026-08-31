const { VenueTypes } = require("../models");
const { validateVenueTypes } = require("../validation/venue_typesValidation");
const { Op } = require("sequelize");

exports.createVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const venueTypes = await VenueTypes.create(req.body);
        res.status(201).send(venueTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findAll();
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenueTypesById = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("Venue types not found");
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("Venue types not found");

        await venueTypes.update(req.body);
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("Venue types not found");

        const deletedData = venueTypes.toJSON();
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

        const venueTypes = await VenueTypes.findAll({
            where: {
                [Op.or]: [
                    ...(isNaN(query) ? [] : [{ venueId: query }, { typeId: query }]),
                ],
            },
        });

        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};