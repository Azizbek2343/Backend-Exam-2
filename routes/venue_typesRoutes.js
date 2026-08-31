const express = require("express");
const router = express.Router();
const venueTypesController = require("../controller/venueTypesController");

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: Venue types management
 */

/**
 * @swagger
 * /api/venue-types:
 *   post:
 *     tags: [VenueTypes]
 *     summary: Create a new venue type relation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Venue type relation created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-types", venueTypesController.createVenueTypes);

/**
 * @swagger
 * /api/venue-types:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get all venue type relations
 *     responses:
 *       200:
 *         description: List of venue type relations
 *       500:
 *         description: Server error
 */
router.get("/venue-types", venueTypesController.getVenueTypes);

/**
 * @swagger
 * /api/venue-types/search:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Search venue types by venueId or typeId
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for venueId or typeId
 *     responses:
 *       200:
 *         description: List of venue type relations matching search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-types/search", venueTypesController.searchVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   get: 
 *     tags: [VenueTypes]
 *     summary: Get venue type relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue types ID
 *     responses:
 *       200:
 *         description: Venue type relation details
 *       404:
 *         description: Venue type not found
 *       500: 
 *         description: Server error
 */
router.get("/venue-types/:id", venueTypesController.getVenueTypesById);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   put:
 *     tags: [VenueTypes]
 *     summary: Update venue type relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue types ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Venue type relation updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/venue-types/:id", venueTypesController.updateVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   delete:
 *     tags: [VenueTypes]
 *     summary: Delete venue type relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue types ID
 *     responses:
 *       200:
 *         description: Venue type relation deleted
 *       404:
 *         description: Venue type not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-types/:id", venueTypesController.deleteVenueTypes);

module.exports = router;