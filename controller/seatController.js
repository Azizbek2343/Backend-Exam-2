const { Seat, Venue, SeatType } = require("../models");
const { validateSeat } = require("../validation/seatValidation");
const { Op } = require("sequelize");

const formatSeatResponse = (seat) => {
    if (!seat) return null;
    const json = seat.toJSON();

    return {
        id: json.id,
        ticket_limit: json.ticket_limit || json.ticketLimit || null,
        name: json.name || null,
        venue: json.venue || null,
        seatType: json.seatType || json.seat_type || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Venue, as: "venue" },
    { model: SeatType, as: "seatType" }
];

exports.createSeat = async (req, res) => {
    const { error } = validateSeat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let seat = await Seat.create(req.body);
        seat = await Seat.findByPk(seat.id, { include: includeOptions });
        res.status(201).send(formatSeatResponse(seat));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSeats = async (req, res) => {
    try {
        const seats = await Seat.findAll({ include: includeOptions });
        const formatted = seats.map(s => formatSeatResponse(s));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id, { include: includeOptions });
        if (!seat) return res.status(404).send("Seat not found");
        res.status(200).send(formatSeatResponse(seat));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSeat = async (req, res) => {
    const { error } = validateSeat(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let seat = await Seat.findByPk(req.params.id);
        if (!seat) return res.status(404).send("Seat not found");

        await seat.update(req.body);
        seat = await Seat.findByPk(seat.id, { include: includeOptions });
        res.status(200).send(formatSeatResponse(seat));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id, { include: includeOptions });
        if (!seat) return res.status(404).send("Seat not found");

        const deletedData = formatSeatResponse(seat);
        await seat.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchSeats = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const seats = await Seat.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [
                        { id: query },
                        { ticket_limit: query }
                    ])
                ],
            },
            include: includeOptions
        });

        const formatted = seats.map(s => formatSeatResponse(s));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};