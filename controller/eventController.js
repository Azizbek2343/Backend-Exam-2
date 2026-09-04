const { Event, EventType, HumanCategory, Venue, Lang } = require("../models");
const { validateEvent } = require("../validation/eventValidation");
const { Op } = require("sequelize");

const formatEventResponse = (event) => {
    if (!event) return null;
    const json = event.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        photo: json.photo || null,
        start_date: json.start_date || json.startDate || null,
        start_time: json.start_time || json.startTime || null,
        finish_date: json.finish_date || json.finishDate || null,
        finish_time: json.finish_time || json.finishTime || null,
        info: json.info || null,
        release_date: json.release_date || json.releaseDate || null,
        eventType: json.eventType || json.event_type || null,
        humanCategory: json.humanCategory || json.human_category || null,
        venue: json.venue || null,
        lang: json.lang || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: EventType, as: "eventType" },
    { model: HumanCategory, as: "humanCategory" },
    { model: Venue, as: "venue" },
    { model: Lang, as: "lang" }
];

exports.createEvent = async (req, res) => {
    if (req.body && typeof req.body.name === 'number') {
        req.body.name = String(req.body.name);
    }
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let event = await Event.create(req.body);
        event = await Event.findByPk(event.id, { include: includeOptions });
        res.status(201).send(formatEventResponse(event));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ include: includeOptions });
        const formatted = events.map(e => formatEventResponse(e));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, { include: includeOptions });
        if (!event) return res.status(404).send("Event not found");
        res.status(200).send(formatEventResponse(event));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");
        
        await event.update(req.body);
        event = await Event.findByPk(event.id, { include: includeOptions });
        res.status(200).send(formatEventResponse(event));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, { include: includeOptions });
        if (!event) return res.status(404).send("Event not found");

        const deletedData = formatEventResponse(event);
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
                    { name: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = events.map(e => formatEventResponse(e));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};