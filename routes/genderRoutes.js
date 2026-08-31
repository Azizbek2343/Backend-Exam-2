const express = require("express");
const router = express.Router();
const genderController = require("../controller/genderController");

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Gender management
 */

/**
 * @swagger
 * /api/gender:
 *   post:
 *     tags: [Gender]
 *     summary: Create a new gender
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
 *         description: Gender created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/gender", genderController.createGender);

/**
 * @swagger
 * /api/gender:
 *   get:
 *     tags: [Gender]
 *     summary: Get all genders
 *     responses:
 *       200:
 *         description: List of genders
 *       500:
 *         description: Server error
 */
router.get("/gender", genderController.getGenders);

/**
 * @swagger
 * /api/gender/search:
 *   get:
 *     tags: [Gender]
 *     summary: Search genders by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for genders name
 *     responses:
 *       200:
 *         description: List of genders matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/gender/search", genderController.searchGender);

/**
 * @swagger
 * /api/gender/{id}:
 *   get: 
 *     tags: [Gender]
 *     summary: Get gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender details
 *       404:
 *         description: Gender not found
 *       500: 
 *         description: Server error
 */
router.get("/gender/:id", genderController.getGenderById);

/**
 * @swagger
 * /api/gender/{id}:
 *   get:
 *     tags: [Gender]
 *     summary: GET gender by ID
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender details
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.get("/gender/:id", genderController.getGenderById);

/**
 * @swagger
 * /api/gender/{id}:
 *   put:
 *     tags: [Gender]
 *     summary: Update gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
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
 *         description: Gender updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/gender/:id", genderController1.updateGender);

/**
 * @swagger
 * /api/gender/{id}:
 *   delete:
 *     tags: [Gender]
 *     summary: Delete gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       204:
 *         description: Gender deleted
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.delete("/gender/:id", genderController.deleteGender);

module.exports = router;