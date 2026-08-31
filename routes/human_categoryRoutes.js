const express = require("express");
const router = express.Router();
const humanCategoryController = require("../controller/human_categoryController");

/**
 * @swagger
 * tags:
 *   name: HumanCategory
 *   description: Human Category management
 */

/**
 * @swagger
 * /api/human-category:
 *   post:
 *     tags: [HumanCategory]
 *     summary: Create a new human category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Human category created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/human-category", humanCategoryController.createHumanCategory);

/**
 * @swagger
 * /api/human-category:
 *   get:
 *     tags: [HumanCategory]
 *     summary: Get all human categories
 *     responses:
 *       200:
 *         description: List of human categories
 *       500:
 *         description: Server error
 */
router.get("/human-category", humanCategoryController.getHumanCategories);

/**
 * @swagger
 * /api/human-category/search:
 *   get:
 *     tags: [HumanCategory]
 *     summary: Search human categories by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for human category name
 *     responses:
 *       200:
 *         description: List of human categories matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/human-category/search", humanCategoryController.searchHumanCategories);

/**
 * @swagger
 * /api/human-category/{id}:
 *   get: 
 *     tags: [HumanCategory]
 *     summary: Get human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human category ID
 *     responses:
 *       200:
 *         description: Human category details
 *       404:
 *         description: Human category not found
 *       500: 
 *         description: Server error
 */
router.get("/human-category/:id", humanCategoryController.getHumanCategoryById);

/**
 * @swagger
 * /api/human-category/{id}:
 *   put:
 *     tags: [HumanCategory]
 *     summary: Update human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human category ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Human category updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/human-category/:id", humanCategoryController.updateHumanCategory);

/**
 * @swagger
 * /api/human-category/{id}:
 *   delete:
 *     tags: [HumanCategory]
 *     summary: Delete human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Human category ID
 *     responses:
 *       200:
 *         description: Human category deleted
 *       404:
 *         description: Human category not found
 *       500:
 *         description: Server error
 */
router.delete("/human-category/:id", humanCategoryController.deleteHumanCategory);

module.exports = router;