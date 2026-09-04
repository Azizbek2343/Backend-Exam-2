const express = require("express");
const router = express.Router();
const customerAddressController = require("../controller/customer_addressController");

/**
 * @swagger
 * tags:
 *   name: CustomerAddresses
 *   description: Customer addresses management
 */

/**
 * @swagger
 * /api/customer-addresses:
 *   post:
 *     tags: [CustomerAddresses]
 *     summary: Create a new customer address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer address created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/customer-addresses", customerAddressController.createCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Get all customer addresses
 *     responses:
 *       200:
 *         description: List of customer addresses
 *       500:
 *         description: Server error
 */
router.get("/customer-addresses", customerAddressController.getCustomerAddresses);

/**
 * @swagger
 * /api/customer-addresses/search:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Search customer addresses by name, street, or house
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for customer address details
 *     responses:
 *       200:
 *         description: List of customer addresses matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/customer-addresses/search", customerAddressController.searchCustomerAddresses);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   get: 
 *     tags: [CustomerAddresses]
 *     summary: Get customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer address ID
 *     responses:
 *       200:
 *         description: Customer address details
 *       404:
 *         description: Customer address not found
 *       500: 
 *         description: Server error
 */
router.get("/customer-addresses/:id", customerAddressController.getCustomerAddressById);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   put:
 *     tags: [CustomerAddresses]
 *     summary: Update customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer address ID
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer address updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer address not found
 *       500:
 *         description: Server error
 */
router.put("/customer-addresses/:id", customerAddressController.updateCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   delete:
 *     tags: [CustomerAddresses]
 *     summary: Delete customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer address ID
 *     responses:
 *       200:
 *         description: Customer address deleted
 *       404:
 *         description: Customer address not found
 *       500:
 *         description: Server error
 */
router.delete("/customer-addresses/:id", customerAddressController.deleteCustomerAddress);

module.exports = router;