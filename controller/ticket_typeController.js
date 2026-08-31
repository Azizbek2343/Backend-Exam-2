const { TicketType } = require("../models");
const { validateTicketType } = require("../validation/ticket_typeValidation");
const { Op } = require("sequelize");

exports.createTicketType = async (req, res) => {
    const { error } = validateTicketType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const ticketType = await TicketType.create(req.body);
        res.status(201).send(ticketType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketTypes = async (req, res) => {
    try {
        const ticketTypes = await TicketType.findAll();
        res.status(200).send(ticketTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const ticketType = await TicketType.findByPk(req.params.id);
        if (!ticketType) return res.status(404).send("Ticket type not found");
        res.status(200).send(ticketType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTicketType = async (req, res) => {
    const { error } = validateTicketType(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const ticketType = await TicketType.findByPk(req.params.id);
        if (!ticketType) return res.status(404).send("Ticket type not found");

        await ticketType.update(req.body);
        res.status(200).send(ticketType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        const ticketType = await TicketType.findByPk(req.params.id);
        if (!ticketType) return res.status(404).send("Ticket type not found");

        const deletedData = ticketType.toJSON();
        await ticketType.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchTicketTypes = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const ticketTypes = await TicketType.findAll({
            where: {
                [Op.or]: [
                    { ticket_type: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(ticketTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};