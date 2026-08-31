const { VenuePhoto } = require("../models");
const { validateVenuePhoto } = require("../validation/venue_photoValidation");
const { Op } = require("sequelize");

exports.createVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const venuePhoto = await VenuePhoto.create(req.body);
        res.status(201).send(venuePhoto);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenuePhotos = async (req, res) => {
    try {
        const venuePhotos = await VenuePhoto.findAll();
        res.status(200).send(venuePhotos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("Venue photo not found");
        res.status(200).send(venuePhoto);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("Venue photo not found");

        await venuePhoto.update(req.body);
        res.status(200).send(venuePhoto);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("Venue photo not found");

        const deletedData = venuePhoto.toJSON();
        await venuePhoto.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchVenuePhotos = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const venuePhotos = await VenuePhoto.findAll({
            where: {
                [Op.or]: [
                    { url: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(venuePhotos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};