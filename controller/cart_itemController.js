const { CartItem } = require("../models");
const { validateCartItem } = require("../validation/cart_itemValidation");
const { Op } = require("sequelize");

exports.createCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const cartItem = await CartItem.create(req.body);
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll();
        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");
        
        await cartItem.update(req.body);
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");

        const deletedData = cartItem.toJSON();
        await cartItem.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchCartItems = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const searchConditions = [];
        if (!isNaN(query)) {
            searchConditions.push({ ticket_id: Number(query) });
            searchConditions.push({ cart_id: Number(query) });
        }

        const cartItems = await CartItem.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
        });

        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};