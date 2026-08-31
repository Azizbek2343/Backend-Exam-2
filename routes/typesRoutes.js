const express = require("express");
const router = express.Router();
const typesController = require("../controller/typesController");

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Types management
 */

/**
 * @swagger
 * /api/types:
 *   post:
 *     tags: [Types]
 *     summary: Create a new type
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
 *         description: Type created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/types", typesController.createTypes);

/**
 * @swagger
 * /api/types:
 *   get:
 *     tags: [Types]
 *     summary: Get all types
 *     responses:
 *       200:
 *         description: List of types
 *       500:
 *         description: Server error
 */
router.get("/types", typesController.getTypes);

/**
 * @swagger
 * /api/types/search:
 *   get:
 *     tags: [Types]
 *     summary: Search types by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for type name
 *     responses:
 *       200:
 *         description: List of types matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/types/search", typesController.searchTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   get: 
 *     tags: [Types]
 *     summary: Get type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Type ID
 *     responses:
 *       200:
 *         description: Type details
 *       404:
 *         description: Type not found
 *       500: 
 *         description: Server error
 */
router.get("/types/:id", typesController.getTypesById);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     tags: [Types]
 *     summary: Update type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Type ID
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
 *         description: Type updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/types/:id", typesController.updateTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     tags: [Types]
 *     summary: Delete type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Type ID
 *     responses:
 *       204:
 *         description: Type deleted
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server error
 */
router.delete("/types/:id", typesController.deleteTypes);

module.exports = router;