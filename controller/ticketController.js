const { Ticket } = require("../models");
const { validateTicket } = require("../validation/ticketValidation");
const { Op } = require("sequelize");

exports.createTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).send(ticket);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");

        await ticket.update(req.body);
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");

        const deletedData = ticket.toJSON();
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

        const tickets = await Ticket.findAll({
            where: {
                [Op.or]: [
                    { price: { [Op.eq]: isNaN(query) ? null : query } },
                ],
            },
        });

        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};