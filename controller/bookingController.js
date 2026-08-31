const { Booking } = require("../models");
const { validateBooking } = require("../validation/bookingValidation");
const { Op } = require("sequelize");

exports.createBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const booking = await Booking.create(req.body);
        res.status(201).send(booking);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");
        
        await booking.update(req.body);
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");

        const deletedData = booking.toJSON();
        await booking.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchBookings = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const searchConditions = [];
        if (!isNaN(query)) {
            searchConditions.push({ cart_id: Number(query) });
            searchConditions.push({ payment_method_id: Number(query) });
            searchConditions.push({ delivery_method_id: Number(query) });
            searchConditions.push({ discount_id: Number(query) });
            searchConditions.push({ status_id: Number(query) });
        }

        const bookings = await Booking.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
        });

        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};