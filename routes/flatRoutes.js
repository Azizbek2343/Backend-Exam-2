const express = require("express");
const router = express.Router();
const flatController = require("../controller/flatController");

/**
 * @swagger
 * tags:
 *   name: Flats
 *   description: Flats management
 */

/**
 * @swagger
 * /api/flats:
 *   post:
 *     tags: [Flats]
 *     summary: Create a new flat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: integer
 *               condition:
 *                 type: string
 *     responses:
 *       201:
 *         description: Flat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/flat", flatController.createFlat);

/**
 * @swagger
 * /api/flats:
 *   get:
 *     tags: [Flats]
 *     summary: Get all flats
 *     responses:
 *       200:
 *         description: List of flats
 *       500:
 *         description: Server error
 */
router.get("/flat", flatController.getFlats);

/**
 * @swagger
 * /api/flats/search:
 *   get:
 *     tags: [Flats]
 *     summary: Search flats by condition
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for flat condition
 *     responses:
 *       200:
 *         description: List of flats matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/flats/search", flatController.searchFlats);

/**
 * @swagger
 * /api/flats/{id}:
 *   get: 
 *     tags: [Flats]
 *     summary: Get flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     responses:
 *       200:
 *         description: Flat details
 *       404:
 *         description: Flat not found
 *       500: 
 *         description: Server error
 */
router.get("/flats/:id", flatController.getFlatById);

/**
 * @swagger
 * /api/flats/{id}:
 *   put:
 *     tags: [Flats]
 *     summary: Update flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: integer
 *               condition:
 *                 type: string
 *     responses:
 *       200:
 *         description: Flat updated
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.put("/flats/:id", flatController.updateFlat);

/**
 * @swagger
 * /api/flats/{id}:
 *   delete:
 *     tags: [Flats]
 *     summary: Delete flat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flat ID
 *     responses:
 *       204:
 *         description: Flat deleted
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.delete("/flats/:id", flatController.deleteFlat);

module.exports = router;