const express = require("express");
const router = express.Router();
const venuePhotoController = require("../controller/venuePhotoController");

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: Venue photo management
 */

/**
 * @swagger
 * /api/venue-photo:
 *   post:
 *     tags: [VenuePhoto]
 *     summary: Create a new venue photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venue photo created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-photo", venuePhotoController.createVenuePhoto);

/**
 * @swagger
 * /api/venue-photo:
 *   get:
 *     tags: [VenuePhoto]
 *     summary: Get all venue photos
 *     responses:
 *       200:
 *         description: List of venue photos
 *       500:
 *         description: Server error
 */
router.get("/venue-photo", venuePhotoController.getVenuePhotos);

/**
 * @swagger
 * /api/venue-photo/search:
 *   get:
 *     tags: [VenuePhoto]
 *     summary: Search venue photos by URL
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for photo URL
 *     responses:
 *       200:
 *         description: List of venue photos matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-photo/search", venuePhotoController.searchVenuePhotos);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   get: 
 *     tags: [VenuePhoto]
 *     summary: Get venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue photo ID
 *     responses:
 *       200:
 *         description: Venue photo details
 *       404:
 *         description: Venue photo not found
 *       500: 
 *         description: Server error
 */
router.get("/venue-photo/:id", venuePhotoController.getVenuePhotoById);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   put:
 *     tags: [VenuePhoto]
 *     summary: Update venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue photo ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue photo updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/venue-photo/:id", venuePhotoController.updateVenuePhoto);

/**
 * @swagger
 * /api/venue-photo/{id}:
 *   delete:
 *     tags: [VenuePhoto]
 *     summary: Delete venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue photo ID
 *     responses:
 *       204:
 *         description: Venue photo deleted
 *       404:
 *         description: Venue photo not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-photo/:id", venuePhotoController.deleteVenuePhoto);

module.exports = router;