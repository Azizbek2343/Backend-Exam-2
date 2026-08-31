const express = require("express");
const router = express.Router();
const sectorController = require("../controller/sectorController");

/**
 * @swagger
 * tags:
 *   name: Sector
 *   description: Sector management
 */

/**
 * @swagger
 * /api/sector:
 *   post:
 *     tags: [Sector]
 *     summary: Create a new sector
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sector created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/sector", sectorController.createSector);

/**
 * @swagger
 * /api/sector:
 *   get:
 *     tags: [Sector]
 *     summary: Get all sectors
 *     responses:
 *       200:
 *         description: List of sectors
 *       500:
 *         description: Server error
 */
router.get("/sector", sectorController.getSectors);

/**
 * @swagger
 * /api/sector/search:
 *   get:
 *     tags: [Sector]
 *     summary: Search sectors by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for sector name
 *     responses:
 *       200:
 *         description: List of sectors matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/sector/search", sectorController.searchSectors);

/**
 * @swagger
 * /api/sector/{id}:
 *   get: 
 *     tags: [Sector]
 *     summary: Get sector by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sector ID
 *     responses:
 *       200:
 *         description: Sector details
 *       404:
 *         description: Sector not found
 *       500: 
 *         description: Server error
 */
router.get("/sector/:id", sectorController.getSectorById);

/**
 * @swagger
 * /api/sector/{id}:
 *   put:
 *     tags: [Sector]
 *     summary: Update sector by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sector ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sector updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/sector/:id", sectorController.updateSector);

/**
 * @swagger
 * /api/sector/{id}:
 *   delete:
 *     tags: [Sector]
 *     summary: Delete sector by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sector ID
 *     responses:
 *       204:
 *         description: Sector deleted
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.delete("/sector/:id", sectorController.deleteSector);

module.exports = router;