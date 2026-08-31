const express = require("express");
const router = express.Router();
const ticketStatusController = require("../controller/ticket_statusController");

/**
 * @swagger
 * tags:
 *   name: TicketStatus
 *   description: TicketStatus management
 */

/**
 * @swagger
 * /api/ticketStatus:
 *   post:
 *     tags: [TicketStatus]
 *     summary: Create a new ticket status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket status created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/ticketStatus", ticketStatusController.createTicketStatus);

/**
 * @swagger
 * /api/ticketStatus:
 *   get:
 *     tags: [TicketStatus]
 *     summary: Get all ticket statuses
 *     responses:
 *       200:
 *         description: List of ticket statuses
 *       500:
 *         description: Server error
 */
router.get("/ticketStatus", ticketStatusController.getTicketStatuses);

/**
 * @swagger
 * /api/ticketStatus/search:
 *   get:
 *     tags: [TicketStatus]
 *     summary: Search ticket statuses by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for ticket status name
 *     responses:
 *       200:
 *         description: List of ticket statuses matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/ticketStatus/search", ticketStatusController.searchTicketStatuses);

/**
 * @swagger
 * /api/ticketStatus/{id}:
 *   get: 
 *     tags: [TicketStatus]
 *     summary: get ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket status ID
 *     responses:
 *       200:
 *         description: Ticket status details
 *       404:
 *         description: Ticket status not found
 *       500: 
 *         description: Server error
 */
router.get("/ticketStatus/:id", ticketStatusController.getTicketStatusById);

/**
 * @swagger
 * /api/ticketStatus/{id}:
 *   get:
 *     tags: [TicketStatus]
 *     summary: GET ticket status by ID
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket status ID
 *     responses:
 *       200:
 *         description: Ticket status details
 *       404:
 *         description: Ticket status not found
 *       500:
 *         description: Server error
 */
router.get("/ticketStatus/:id", ticketStatusController.getTicketStatusById);

/**
 * @swagger
 * /api/ticketStatus/{id}:
 *   put:
 *     tags: [TicketStatus]
 *     summary: Update ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket status ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket status updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/ticketStatus/:id", ticketStatusController.updateTicketStatus);

/**
 * @swagger
 * /api/ticketStatus/{id}:
 *   delete:
 *     tags: [TicketStatus]
 *     summary: Delete ticket status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ticket status ID
 *     responses:
 *       204:
 *         description: Ticket status deleted
 *       404:
 *         description: Ticket status not found
 *       500:
 *         description: Server error
 */
router.delete("/ticketStatus/:id", ticketStatusController.deleteTicketStatus);

module.exports = router;