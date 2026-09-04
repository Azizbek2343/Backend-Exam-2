const express = require("express");
const router = express.Router();
const cartItemController = require("../controller/cart_itemController");

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Cart items management
 */

/**
 * @swagger
 * /api/cart-items:
 *   post:
 *     tags: [CartItems]
 *     summary: Create a new cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/cart-items", cartItemController.createCartItem);

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     tags: [CartItems]
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get("/cart-items", cartItemController.getCartItems);

/**
 * @swagger
 * /api/cart-items/search:
 *   get:
 *     tags: [CartItems]
 *     summary: Search cart items by ticket ID or cart ID
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for cart item details
 *     responses:
 *       200:
 *         description: List of cart items matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/cart-items/search", cartItemController.searchCartItems);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   get: 
 *     tags: [CartItems]
 *     summary: Get cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart item details
 *       404:
 *         description: Cart item not found
 *       500: 
 *         description: Server error
 */
router.get("/cart-items/:id", cartItemController.getCartItemById);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   put:
 *     tags: [CartItems]
 *     summary: Update cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.put("/cart-items/:id", cartItemController.updateCartItem);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   delete:
 *     tags: [CartItems]
 *     summary: Delete cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart item deleted
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete("/cart-items/:id", cartItemController.deleteCartItem);

module.exports = router;