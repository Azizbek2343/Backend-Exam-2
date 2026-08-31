const express = require("express");
const router = express.Router();
const langController = require("../controller/langController");

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Language management
 */

/**
 * @swagger
 * /api/lang:
 *   post:
 *     tags: [Lang]
 *     summary: Create a new language
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
 *         description: Language created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/lang", langController.createLang);

/**
 * @swagger
 * /api/lang:
 *   get:
 *     tags: [Lang]
 *     summary: Get all languages
 *     responses:
 *       200:
 *         description: List of languages
 *       500:
 *         description: Server error
 */
router.get("/lang", langController.getLangs);

/**
 * @swagger
 * /api/lang/search:
 *   get:
 *     tags: [Lang]
 *     summary: Search languages by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for language name
 *     responses:
 *       200:
 *         description: List of languages matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/lang/search", langController.searchLangs);

/**
 * @swagger
 * /api/lang/{id}:
 *   get: 
 *     tags: [Lang]
 *     summary: Get language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
 *     responses:
 *       200:
 *         description: Language details
 *       404:
 *         description: Language not found
 *       500: 
 *         description: Server error
 */
router.get("/lang/:id", langController.getLangById);

/**
 * @swagger
 * /api/lang/{id}:
 *   put:
 *     tags: [Lang]
 *     summary: Update language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
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
 *         description: Language updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/lang/:id", langController.updateLang);

/**
 * @swagger
 * /api/lang/{id}:
 *   delete:
 *     tags: [Lang]
 *     summary: Delete language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Language ID
 *     responses:
 *       200:
 *         description: Language deleted
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.delete("/lang/:id", langController.deleteLang);

module.exports = router;