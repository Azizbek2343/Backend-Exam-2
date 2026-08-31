const { TicketStatus } = require("../models");
const { validateTicketStatus } = require("../validation/ticket_statusValidation");
const { Op } = require("sequelize");

exports.createTicketStatus = async (req, res) => {
    const { error } = validateTicketStatus(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const ticketStatus = await TicketStatus.create(req.body);
        res.status(201).send(ticketStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketStatuses = async (req, res) => {
    try {
        const ticketStatuses = await TicketStatus.findAll();
        res.status(200).send(ticketStatuses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketStatusById = async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.findByPk(req.params.id);
        if (!ticketStatus) return res.status(404).send("Ticket status not found");
        res.status(200).send(ticketStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTicketStatus = async (req, res) => {
    const { error } = validateTicketStatus(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const ticketStatus = await TicketStatus.findByPk(req.params.id);
        if (!ticketStatus) return res.status(404).send("Ticket status not found");

        await ticketStatus.update(req.body);
        res.status(200).send(ticketStatus);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTicketStatus = async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.findByPk(req.params.id);
        if (!ticketStatus) return res.status(404).send("Ticket status not found");

        const deletedData = ticketStatus.toJSON();
        await ticketStatus.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchTicketStatuses = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const ticketStatuses = await TicketStatus.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(ticketStatuses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};