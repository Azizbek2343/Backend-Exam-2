const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *               fineshed:
 *                 type: string
 *                 format: date-time
 *               payment_method_id:
 *                 type: integer
 *               delivery_method_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/booking", bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags: [Bookings]
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: List of bookings
 *       500:
 *         description: Server error
 */
router.get("/booking", bookingController.getBookings);

/**
 * @swagger
 * /api/bookings/search:
 *   get:
 *     tags: [Bookings]
 *     summary: Search bookings by IDs
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for booking details
 *     responses:
 *       200:
 *         description: List of bookings matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/bookings/search", bookingController.searchBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get: 
 *     tags: [Bookings]
 *     summary: Get booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *       500: 
 *         description: Server error
 */
router.get("/bookings/:id", bookingController.getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     tags: [Bookings]
 *     summary: Update booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *               fineshed:
 *                 type: string
 *                 format: date-time
 *               payment_method_id:
 *                 type: integer
 *               delivery_method_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put("/bookings/:id", bookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Bookings]
 *     summary: Delete booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete("/bookings/:id", bookingController.deleteBooking);

module.exports = router;