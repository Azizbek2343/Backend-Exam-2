const express = require("express");
const router = express.Router();
const paymentMethodController = require("../controller/payment_methodController");

/**
 * @swagger
 * tags:
 *   name: PaymentMethods
 *   description: PaymentMethods management
 */

/**
 * @swagger
 * /api/paymentMethods:
 *   post:
 *     tags: [PaymentMethods]
 *     summary: Create a new payment method
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
 *         description: Payment method created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/paymentMethods", paymentMethodController.createPaymentMethod);

/**
 * @swagger
 * /api/paymentMethods:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Get all payment methods
 *     responses:
 *       200:
 *         description: List of payment methods
 *       500:
 *         description: Server error
 */
router.get("/paymentMethods", paymentMethodController.getPaymentMethods);

/**
 * @swagger
 * /api/paymentMethods/search:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Search payment methods by name
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for payment method name
 *     responses:
 *       200:
 *         description: List of payment method matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/paymentMethods/search", paymentMethodController.searchPaymentMethods);

/**
 * @swagger
 * /api/paymentMethods/{id}:
 *   get: 
 *     tags: [PaymentMethods]
 *     summary: get payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method details
 *       404:
 *         description: Payment method not found
 *       500: 
 *         description: Server error
 */
router.get("/paymentMethods/:id", paymentMethodController.getPaymentMethodById);

/**
 * @swagger
 * /api/paymentMethods/{id}:
 *   put:
 *     tags: [PaymentMethods]
 *     summary: Update payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment method ID
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
 *         description: Payment method updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/paymentMethods/:id", paymentMethodController.updatePaymentMethod);

/**
 * @swagger
 * /api/paymentMethods/{id}:
 *   delete:
 *     tags: [PaymentMethods]
 *     summary: Delete payment method by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Payment method ID
 *     responses:
 *       204:
 *         description: Payment method deleted
 *       404:
 *         description: Payment method not found
 *       500:
 *         description: Server error
 */
router.delete("/paymentMethods/:id", paymentMethodController.deletePaymentMethod);

module.exports = router;