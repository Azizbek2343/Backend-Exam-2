const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     tags: [Admins]
 *     summary: Create a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/admin", adminController.createAdmin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     tags: [Admins]
 *     summary: Get all admins
 *     responses:
 *       200:
 *         description: List of admins
 *       500:
 *         description: Server error
 */
router.get("/admin", adminController.getAdmins);

/**
 * @swagger
 * /api/admins/search:
 *   get:
 *     tags: [Admins]
 *     summary: Search admins by name, login, or ID
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for admin details
 *     responses:
 *       200:
 *         description: List of admins matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/admins/search", adminController.searchAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get: 
 *     tags: [Admins]
 *     summary: Get admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin details
 *       404:
 *         description: Admin not found
 *       500: 
 *         description: Server error
 */
router.get("/admins/:id", adminController.getAdminById);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     tags: [Admins]
 *     summary: Update admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.put("/admins/:id", adminController.updateAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     tags: [Admins]
 *     summary: Delete admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;