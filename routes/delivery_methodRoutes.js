const express = require("express");
const router = express.Router();
const deliveryMethodController = require("../controller/delivery_methodController");

/**
 * @swagger
 * tags:
 *   name: DeliveryMethods
 *   description: DeliveryMethods management
 */

/**
 * @swagger
 * /api/deliveryMethods:
 *   post:
 *     tags: [DeliveryMethods]
 *     summary: Create a new delivery method
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
 *         description: Delivery method created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/deliveryMethods", deliveryMethodController.createDeliveryMethod);

/**
 * @swagger
 * /api/deliveryMethods:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Get all delivery methods
 *     responses:
 *       200:
 *         description: List of delivery methods
 *       500:
 *         description: Server error
 */
router.get("/deliveryMethods", deliveryMethodController.getDeliveryMethods);

/**
 * @swagger
 * /api/deliveryMethods/search:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Search delivery methods by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for delivery method name
 *     responses:
 *       200:
 *         description: List of delivery methods matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/deliveryMethods/search", deliveryMethodController.searchDeliveryMethods);

/**
 * @swagger
 * /api/deliveryMethods/{id}:
 *   get: 
 *     tags: [DeliveryMethods]
 *     summary: Get delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery method ID
 *     responses:
 *       200:
 *         description: Delivery method details
 *       404:
 *         description: Delivery method not found
 *       500: 
 *         description: Server error
 */
router.get("/deliveryMethods/:id", deliveryMethodController.getDeliveryMethodById);

/**
 * @swagger
 * /api/deliveryMethods/{id}:
 *   put:
 *     tags: [DeliveryMethods]
 *     summary: Update delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery method ID
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
 *         description: Delivery method updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/deliveryMethods/:id", deliveryMethodController.updateDeliveryMethod);

/**
 * @swagger
 * /api/deliveryMethods/{id}:
 *   delete:
 *     tags: [DeliveryMethods]
 *     summary: Delete delivery method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Delivery method ID
 *     responses:
 *       204:
 *         description: Delivery method deleted
 *       404:
 *         description: Delivery method not found
 *       500:
 *         description: Server error
 */
router.delete("/deliveryMethods/:id", deliveryMethodController.deleteDeliveryMethod);

module.exports = router;