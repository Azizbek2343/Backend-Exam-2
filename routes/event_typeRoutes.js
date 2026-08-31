const express = require("express");
const router = express.Router();
const eventTypeController = require("../controller/event_typeController");

/**
 * @swagger
 * tags:
 *   name: EventTypes
 *   description: Event Types management
 */

/**
 * @swagger
 * /api/event-types:
 *   post:
 *     tags: [EventTypes]
 *     summary: Create a new event type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/event-type", eventTypeController.createEventType);

/**
 * @swagger
 * /api/event-types:
 *   get:
 *     tags: [EventTypes]
 *     summary: Get all event types
 *     responses:
 *       200:
 *         description: List of event types
 *       500:
 *         description: Server error
 */
router.get("/event-type", eventTypeController.getEventTypes);

/**
 * @swagger
 * /api/event-types/search:
 *   get:
 *     tags: [EventTypes]
 *     summary: Search event types by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for event type name
 *     responses:
 *       200:
 *         description: List of event types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/event-types/search", eventTypeController.searchEventTypes);

/**
 * @swagger
 * /api/event-types/{id}:
 *   get: 
 *     tags: [EventTypes]
 *     summary: Get event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event type ID
 *     responses:
 *       200:
 *         description: Event type details
 *       404:
 *         description: Event type not found
 *       500: 
 *         description: Server error
 */
router.get("/event-types/:id", eventTypeController.getEventTypeById);

/**
 * @swagger
 * /api/event-types/{id}:
 *   put:
 *     tags: [EventTypes]
 *     summary: Update event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event type ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event type updated
 *       404:
 *         description: Event type not found
 *       500:
 *         description: Server error
 */
router.put("/event-types/:id", eventTypeController.updateEventType);

/**
 * @swagger
 * /api/event-types/{id}:
 *   delete:
 *     tags: [EventTypes]
 *     summary: Delete event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event type ID
 *     responses:
 *       204:
 *         description: Event type deleted
 *       404:
 *         description: Event type not found
 *       500:
 *         description: Server error
 */
router.delete("/event-types/:id", eventTypeController.deleteEventType);

module.exports = router;