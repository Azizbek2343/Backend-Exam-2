const { CustomerCard, Customer } = require("../models");
const { validateCustomerCard } = require("../validation/customer_cardValidation");
const { Op } = require("sequelize");

const formatCustomerCardResponse = (customerCard) => {
    if (!customerCard) return null;
    const json = customerCard.toJSON();

    return {
        id: json.id,
        name: json.name || null,
        phone: json.phone || null,
        number: json.number || null,
        year: json.year || null,
        month: json.month || null,
        is_active: json.is_active !== undefined ? json.is_active : json.isActive ?? null,
        is_main: json.is_main !== undefined ? json.is_main : json.isMain ?? null,
        customer: json.customer || json.Customer || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Customer, as: "customer" }
];

exports.createCustomerCard = async (req, res) => {
    const { error } = validateCustomerCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let customerCard = await CustomerCard.create(req.body);
        customerCard = await CustomerCard.findByPk(customerCard.id, { include: includeOptions });
        res.status(201).send(formatCustomerCardResponse(customerCard));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerCards = async (req, res) => {
    try {
        const customerCards = await CustomerCard.findAll({ include: includeOptions });
        const formatted = customerCards.map(c => formatCustomerCardResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerCardById = async (req, res) => {
    try {
        const customerCard = await CustomerCard.findByPk(req.params.id, { include: includeOptions });
        if (!customerCard) return res.status(404).send("Customer card not found");
        res.status(200).send(formatCustomerCardResponse(customerCard));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomerCard = async (req, res) => {
    const { error } = validateCustomerCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let customerCard = await CustomerCard.findByPk(req.params.id);
        if (!customerCard) return res.status(404).send("Customer card not found");
        
        await customerCard.update(req.body);
        customerCard = await CustomerCard.findByPk(customerCard.id, { include: includeOptions });
        res.status(200).send(formatCustomerCardResponse(customerCard));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCustomerCard = async (req, res) => {
    try {
        const customerCard = await CustomerCard.findByPk(req.params.id, { include: includeOptions });
        if (!customerCard) return res.status(404).send("Customer card not found");

        const deletedData = formatCustomerCardResponse(customerCard);
        await customerCard.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchCustomerCards = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const customerCards = await CustomerCard.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                    { number: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = customerCards.map(c => formatCustomerCardResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};