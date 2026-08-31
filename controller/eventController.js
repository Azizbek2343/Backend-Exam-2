const { Event } = require("../models");
const { validateEvent } = require("../validation/eventValidation");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const event = await Event.create(req.body);
        res.status(201).send(event);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");
        
        await event.update(req.body);
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const deletedData = event.toJSON();
        await event.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchEvents = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const events = await Event.findAll({
            where: {
                [Op.or]: [
                    { info: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
};