const { VenuePhoto, Venue } = require("../models");
const { validateVenuePhoto } = require("../validation/venue_photoValidation");
const { Op } = require("sequelize");

const formatVenuePhotoResponse = (venuePhoto) => {
    if (!venuePhoto) return null;
    const json = venuePhoto.toJSON();

    return {
        id: json.id,
        venue: json.venue || null,
        url: json.url,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Venue, as: "venue" }
];

exports.createVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let venuePhoto = await VenuePhoto.create(req.body);
        venuePhoto = await VenuePhoto.findByPk(venuePhoto.id, { include: includeOptions });
        res.status(201).send(formatVenuePhotoResponse(venuePhoto));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenuePhotos = async (req, res) => {
    try {
        const venuePhotos = await VenuePhoto.findAll({ include: includeOptions });
        const formatted = venuePhotos.map(v => formatVenuePhotoResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id, { include: includeOptions });
        if (!venuePhoto) return res.status(404).send("Venue photo not found");
        res.status(200).send(formatVenuePhotoResponse(venuePhoto));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("Venue photo not found");

        await venuePhoto.update(req.body);
        
        venuePhoto = await VenuePhoto.findByPk(venuePhoto.id, { include: includeOptions });
        res.status(200).send(formatVenuePhotoResponse(venuePhoto));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id, { include: includeOptions });
        if (!venuePhoto) return res.status(404).send("Venue photo not found");

        const deletedData = formatVenuePhotoResponse(venuePhoto);
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
                    ...(isNaN(query) ? [] : [{ venueId: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = venuePhotos.map(v => formatVenuePhotoResponse(v));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};