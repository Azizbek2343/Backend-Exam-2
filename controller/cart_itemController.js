const { CartItem, Ticket, Cart } = require("../models");
const { validateCartItem } = require("../validation/cart_itemValidation");
const { Op } = require("sequelize");

const formatCartItemResponse = (cartItem) => {
    if (!cartItem) return null;
    const json = cartItem.toJSON();

    return {
        id: json.id,
        ticket: json.ticket || json.Ticket || null,
        cart: json.cart || json.Cart || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Ticket, as: "ticket" },
    { model: Cart, as: "cart" }
];

exports.createCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let cartItem = await CartItem.create(req.body);
        cartItem = await CartItem.findByPk(cartItem.id, { include: includeOptions });
        res.status(201).send(formatCartItemResponse(cartItem));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({ include: includeOptions });
        const formatted = cartItems.map(c => formatCartItemResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id, { include: includeOptions });
        if (!cartItem) return res.status(404).send("Cart item not found");
        res.status(200).send(formatCartItemResponse(cartItem));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");
        
        await cartItem.update(req.body);
        cartItem = await CartItem.findByPk(cartItem.id, { include: includeOptions });
        res.status(200).send(formatCartItemResponse(cartItem));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id, { include: includeOptions });
        if (!cartItem) return res.status(404).send("Cart item not found");

        const deletedData = formatCartItemResponse(cartItem);
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
            searchConditions.push({ id: Number(query) });
        }

        const cartItems = await CartItem.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
            include: includeOptions
        });

        const formatted = cartItems.map(c => formatCartItemResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};