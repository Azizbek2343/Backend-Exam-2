const express = require("express");
const router = express.Router();
const ticketTypeController = require("../controller/ticket_typeController");

/**
 * @swagger
 * tags:
 *   name: TicketTypes
 *   description: Ticket Types management
 */

/**
 * @swagger
 * /api/ticket-types:
 *   post:
 *     tags: [TicketTypes]
 *     summary: Create a new ticket type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/ticket-types", ticketTypeController.createTicketType);

/**
 * @swagger
 * /api/ticket-types:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Get all ticket types
 *     responses:
 *       200:
 *         description: List of ticket types
 *       500:
 *         description: Server error
 */
router.get("/ticket-types", ticketTypeController.getTicketTypes);

/**
 * @swagger
 * /api/ticket-types/search:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Search ticket types by ticket type name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for ticket type
 *     responses:
 *       200:
 *         description: List of ticket types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/ticket-types/search", ticketTypeController.searchTicketTypes);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   get: 
 *     tags: [TicketTypes]
 *     summary: Get ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket type ID
 *     responses:
 *       200:
 *         description: Ticket type details
 *       404:
 *         description: Ticket type not found
 *       500: 
 *         description: Server error
 */
router.get("/ticket-types/:id", ticketTypeController.getTicketTypeById);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   put:
 *     tags: [TicketTypes]
 *     summary: Update ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket type ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket type updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ticket type not found
 *       500:
 *         description: Server error
 */
router.put("/ticket-types/:id", ticketTypeController.updateTicketType);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   delete:
 *     tags: [TicketTypes]
 *     summary: Delete ticket type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket type ID
 *     responses:
 *       204:
 *         description: Ticket type deleted
 *       404:
 *         description: Ticket type not found
 *       500:
 *         description: Server error
 */
router.delete("/ticket-types/:id", ticketTypeController.deleteTicketType);

module.exports = router;