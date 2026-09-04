const { Ticket, Event, Seat, TicketStatus, TicketType } = require("../models");
const { validateTicket } = require("../validation/ticketValidation");
const { Op } = require("sequelize");

const formatTicketResponse = (ticket) => {
    if (!ticket) return null;
    const json = ticket.toJSON();

    return {
        id: json.id,
        event: json.event || null,
        seat: json.seat || null,
        price: json.price,
        service_fee: json.service_fee,
        status: json.status || null,
        ticket_type: json.ticket_type || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Event, as: "event" },
    { model: Seat, as: "seat" },
    { model: TicketStatus, as: "status" },
    { model: TicketType, as: "ticket_type" }
];

exports.createTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let ticket = await Ticket.create(req.body);
        ticket = await Ticket.findByPk(ticket.id, { include: includeOptions });
        res.status(201).send(formatTicketResponse(ticket));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({ include: includeOptions });
        const formatted = tickets.map(t => formatTicketResponse(t));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, { include: includeOptions });
        if (!ticket) return res.status(404).send("Ticket not found");
        res.status(200).send(formatTicketResponse(ticket));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");

        await ticket.update(req.body);
        
        ticket = await Ticket.findByPk(ticket.id, { include: includeOptions });
        res.status(200).send(formatTicketResponse(ticket));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, { include: includeOptions });
        if (!ticket) return res.status(404).send("Ticket not found");

        const deletedData = formatTicketResponse(ticket);
        await ticket.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchTickets = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const whereCondition = {};
        if (!isNaN(query)) {
            whereCondition.price = query;
        }

        const tickets = await Ticket.findAll({
            where: whereCondition,
            include: includeOptions
        });

        const formatted = tickets.map(t => formatTicketResponse(t));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};