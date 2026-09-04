const { Venue, Region, District } = require("../models");
const { validateVenue } = require("../validation/venueValidation");
const { Op } = require("sequelize");

const formatVenueResponse = (venue) => {
    if (!venue) return null;
    const json = venue.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        address: json.address || null,
        location: json.location || null,
        site: json.site || null,
        phone: json.phone || null,
        schema: json.schema || null,
        region: json.region || null,
        district: json.district || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Region, as: "region" },
    { model: District, as: "district" }
];

exports.createVenue = async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let venue = await Venue.create(req.body);
        venue = await Venue.findByPk(venue.id, { include: includeOptions });
        res.status(201).send(formatVenueResponse(venue));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll({ include: includeOptions });
        const formatted = venues.map(v => formatVenueResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findByPk(req.params.id, { include: includeOptions });
        if (!venue) return res.status(404).send("Venue not found");
        res.status(200).send(formatVenueResponse(venue));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVenue = async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let venue = await Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).send("Venue not found");

        await venue.update(req.body);
        venue = await Venue.findByPk(venue.id, { include: includeOptions });
        res.status(200).send(formatVenueResponse(venue));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByPk(req.params.id, { include: includeOptions });
        if (!venue) return res.status(404).send("Venue not found");

        const deletedData = formatVenueResponse(venue);
        await venue.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchVenues = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const venues = await Venue.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { address: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = venues.map(v => formatVenueResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};