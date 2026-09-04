const { SeatType } = require("../models");
const { validateSeatType } = require("../validation/seat_typeValidation");
const { Op } = require("sequelize");

const formatSeatTypeResponse = (seatType) => {
    if (!seatType) return null;
    const json = seatType.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [];

exports.createSeatType = async (req, res) => {
    const { error } = validateSeatType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let seatType = await SeatType.create(req.body);
        seatType = await SeatType.findByPk(seatType.id, { include: includeOptions });
        res.status(201).send(formatSeatTypeResponse(seatType));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSeatTypes = async (req, res) => {
    try {
        const seatTypes = await SeatType.findAll({ include: includeOptions });
        const formatted = seatTypes.map(s => formatSeatTypeResponse(s));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSeatTypeById = async (req, res) => {
    try {
        const seatType = await SeatType.findByPk(req.params.id, { include: includeOptions });
        if (!seatType) return res.status(404).send("Seat type not found");
        res.status(200).send(formatSeatTypeResponse(seatType));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSeatType = async (req, res) => {
    const { error } = validateSeatType(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let seatType = await SeatType.findByPk(req.params.id);
        if (!seatType) return res.status(404).send("Seat type not found");

        await seatType.update(req.body);
        seatType = await SeatType.findByPk(seatType.id, { include: includeOptions });
        res.status(200).send(formatSeatTypeResponse(seatType));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSeatType = async (req, res) => {
    try {
        const seatType = await SeatType.findByPk(req.params.id, { include: includeOptions });
        if (!seatType) return res.status(404).send("Seat type not found");

        const deletedData = formatSeatTypeResponse(seatType);
        await seatType.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchSeatTypes = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const seatTypes = await SeatType.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = seatTypes.map(s => formatSeatTypeResponse(s));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};