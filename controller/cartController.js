const { Cart, Customer, TicketStatus } = require("../models");
const { validateCart } = require("../validation/cartValidation");
const { Op } = require("sequelize");

const formatCartResponse = (cart) => {
    if (!cart) return null;
    const json = cart.toJSON();

    return {
        id: json.id,
        customer: json.customer || json.Customer || null,
        fineshedAt: json.fineshedAt || json.finishedAt || null,
        status: json.ticket_status || json.TicketStatus || json.status || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Customer, as: "customer" },
    { model: TicketStatus, as: "status" }
];

exports.createCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let cart = await Cart.create(req.body);
        cart = await Cart.findByPk(cart.id, { include: includeOptions });
        res.status(201).send(formatCartResponse(cart));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll({ include: includeOptions });
        const formatted = carts.map(c => formatCartResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id, { include: includeOptions });
        if (!cart) return res.status(404).send("Cart not found");
        res.status(200).send(formatCartResponse(cart));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");
        
        await cart.update(req.body);
        cart = await Cart.findByPk(cart.id, { include: includeOptions });
        res.status(200).send(formatCartResponse(cart));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id, { include: includeOptions });
        if (!cart) return res.status(404).send("Cart not found");

        const deletedData = formatCartResponse(cart);
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
            searchConditions.push({ id: Number(query) });
        }

        const carts = await Cart.findAll({
            where: searchConditions.length > 0 ? { [Op.or]: searchConditions } : {},
            include: includeOptions
        });

        const formatted = carts.map(c => formatCartResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};