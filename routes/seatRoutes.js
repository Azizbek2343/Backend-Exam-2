const express = require("express");
const router = express.Router();
const seatController = require("../controller/seatController");

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Seat management
 */

/**
 * @swagger
 * /api/seat:
 *   post:
 *     tags: [Seat]
 *     summary: Create a new seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/seat", seatController.createSeat);

/**
 * @swagger
 * /api/seat:
 *   get:
 *     tags: [Seat]
 *     summary: Get all seats
 *     responses:
 *       200:
 *         description: List of seats
 *       500:
 *         description: Server error
 */
router.get("/seat", seatController.getSeats);

/**
 * @swagger
 * /api/seat/search:
 *   get:
 *     tags: [Seat]
 *     summary: Search seats by row number or number
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for row number or number
 *     responses:
 *       200:
 *         description: List of seats matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/seat/search", seatController.searchSeats);

/**
 * @swagger
 * /api/seat/{id}:
 *   get: 
 *     tags: [Seat]
 *     summary: Get seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat details
 *       404:
 *         description: Seat not found
 *       500: 
 *         description: Server error
 */
router.get("/seat/:id", seatController.getSeatById);

/**
 * @swagger
 * /api/seat/{id}:
 *   put:
 *     tags: [Seat]
 *     summary: Update seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/seat/:id", seatController.updateSeat);

/**
 * @swagger
 * /api/seat/{id}:
 *   delete:
 *     tags: [Seat]
 *     summary: Delete seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat deleted
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete("/seat/:id", seatController.deleteSeat);

module.exports = router;