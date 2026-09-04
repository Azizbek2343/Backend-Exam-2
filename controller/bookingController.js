const { Booking, Cart, PaymentMethod, DeliveryMethod, Discount, TicketStatus } = require("../models");
const { validateBooking } = require("../validation/bookingValidation");
const { Op } = require("sequelize");

const formatBookingResponse = (booking) => {
    if (!booking) return null;
    const json = booking.toJSON();

    return {
        id: json.id,
        cart: json.cart || json.Cart || null,
        fineshed: json.fineshed || null,
        paymentMethod: json.payment_method || json.paymentMethod || json.PaymentMethod || null,
        deliveryMethod: json.delivery_method || json.deliveryMethod || json.DeliveryMethod || null,
        discount: json.discount || json.Discount || null,
        status: json.ticket_status || json.TicketStatus || json.status || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Cart, as: "cart" },
    { model: PaymentMethod, as: "paymentMethod" },
    { model: DeliveryMethod, as: "deliveryMethod" },
    { model: Discount, as: "discount" },
    { model: TicketStatus, as: "status" }
];

exports.createBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let booking = await Booking.create(req.body);
        booking = await Booking.findByPk(booking.id, { include: includeOptions });
        res.status(201).send(formatBookingResponse(booking));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ include: includeOptions });
        const formatted = bookings.map(b => formatBookingResponse(b));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, { include: includeOptions });
        if (!booking) return res.status(404).send("Booking not found");
        res.status(200).send(formatBookingResponse(booking));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");
        
        await booking.update(req.body);
        booking = await Booking.findByPk(booking.id, { include: includeOptions });
        res.status(200).send(formatBookingResponse(booking));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, { include: includeOptions });
        if (!booking) return res.status(404).send("Booking not found");

        const deletedData = formatBookingResponse(booking);
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
            searchConditions.push({ id: Number(query) });
        }

        const bookings = await Booking.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
            include: includeOptions
        });

        const formatted = bookings.map(b => formatBookingResponse(b));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};