const { Cart } = require("../models");
const { validateCart } = require("../validation/cartValidation");
const { Op } = require("sequelize");

exports.createCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const cart = await Cart.create(req.body);
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");
        
        await cart.update(req.body);
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");

        const deletedData = cart.toJSON();
        await cart.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchCarts = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const searchConditions = [];
        if (!isNaN(query)) {
            searchConditions.push({ customer_id: Number(query) });
            searchConditions.push({ status_id: Number(query) });
        }

        const carts = await Cart.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
        });

        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};