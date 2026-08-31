const express = require("express");
const router = express.Router();
const seatTypeController = require("../controller/seat_typeController");

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: SeatType management
 */

/**
 * @swagger
 * /api/seatType:
 *   post:
 *     tags: [SeatType]
 *     summary: Create a new seat type
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
 *         description: Seat type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/seatType", seatTypeController.createSeatType);

/**
 * @swagger
 * /api/seatType:
 *   get:
 *     tags: [SeatType]
 *     summary: Get all seat types
 *     responses:
 *       200:
 *         description: List of seat types
 *       500:
 *         description: Server error
 */
router.get("/seatType", seatTypeController.getSeatTypes);

/**
 * @swagger
 * /api/seatType/search:
 *   get:
 *     tags: [SeatType]
 *     summary: Search seat types by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for seat types name
 *     responses:
 *       200:
 *         description: List of seat types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/seatType/search", seatTypeController.searchSeatTypes);

/**
 * @swagger
 * /api/seatType/{id}:
 *   get: 
 *     tags: [SeatType]
 *     summary: get seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat type ID
 *     responses:
 *       200:
 *         description: Seat type details
 *       404:
 *         description: Seat type not found
 *       500: 
 *         description: Server error
 */
router.get("/seatType/:id", seatTypeController.getSeatTypeById);

/**
 * @swagger
 * /api/seatType/{id}:
 *   get:
 *     tags: [SeatType]
 *     summary: GET seat type by ID
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat type ID
 *     responses:
 *       200:
 *         description: Seat type details
 *       404:
 *         description: Seat type not found
 *       500:
 *         description: Server error
 */
router.get("/seatType/:id", seatTypeController.getSeatTypeById);

/**
 * @swagger
 * /api/seatType/{id}:
 *   put:
 *     tags: [SeatType]
 *     summary: Update seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat type ID
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
 *         description: Seat type updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/seatType/:id", seatTypeController.updateSeatType);

/**
 * @swagger
 * /api/seatType/{id}:
 *   delete:
 *     tags: [SeatType]
 *     summary: Delete seat type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat type ID
 *     responses:
 *       204:
 *         description: Seat type deleted
 *       404:
 *         description: Seat type not found
 *       500:
 *         description: Server error
 */
router.delete("/seatType/:id", seatTypeController.deleteSeatType);

module.exports = router;