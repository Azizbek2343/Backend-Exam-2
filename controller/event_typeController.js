const { EventType } = require("../models");
const { validateEventType } = require("../validation/event_typeValidation");
const { Op } = require("sequelize");

exports.createEventType = async (req, res) => {
    const { error } = validateEventType(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const eventType = await EventType.create(req.body);
        res.status(201).send(eventType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEventTypes = async (req, res) => {
    try {
        const eventTypes = await EventType.findAll();
        res.status(200).send(eventTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).send("Event type not found");
        res.status(200).send(eventType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEventType = async (req, res) => {
    const { error } = validateEventType(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).send("Event type not found");
        
        await eventType.update(req.body);
        res.status(200).send(eventType);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteEventType = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).send("Event type not found");

        const deletedData = eventType.toJSON();
        await eventType.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchEventTypes = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const eventTypes = await EventType.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(eventTypes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};