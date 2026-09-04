const bcrypt = require("bcryptjs");
const { Customer, Gender, Lang } = require("../models");
const { validateCustomer } = require("../validation/customerValidation");
const { Op } = require("sequelize");

const formatCustomerResponse = (customer) => {
    if (!customer) return null;
    const json = customer.toJSON();

    return {
        id: json.id,
        first_name: json.first_name || json.firstName || null,
        last_name: json.last_name || json.lastName || null,
        phone: json.phone || null,
        email: json.email || null,
        birth_date: json.birth_date || json.birthDate || null,
        gender: json.gender || json.Gender || null,
        lang: json.lang || json.Lang || null,
        hashed_refresh_token: json.hashed_refresh_token || json.hashedRefreshToken || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Gender, as: "gender" },
    { model: Lang, as: "lang" }
];

exports.createCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        if (req.body.hashed_password) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_password = await bcrypt.hash(req.body.hashed_password, salt);
        }

        let customer = await Customer.create(req.body);
        customer = await Customer.findByPk(customer.id, { include: includeOptions });
        res.status(201).send(formatCustomerResponse(customer));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({ include: includeOptions });
        const formatted = customers.map(c => formatCustomerResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: includeOptions });
        if (!customer) return res.status(404).send("Customer not found");
        res.status(200).send(formatCustomerResponse(customer));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");

        if (req.body.hashed_password) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_password = await bcrypt.hash(req.body.hashed_password, salt);
        }
        
        await customer.update(req.body);
        customer = await Customer.findByPk(customer.id, { include: includeOptions });
        res.status(200).send(formatCustomerResponse(customer));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: includeOptions });
        if (!customer) return res.status(404).send("Customer not found");

        const deletedData = formatCustomerResponse(customer);
        await customer.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchCustomers = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const customers = await Customer.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${query}%` } },
                    { last_name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = customers.map(c => formatCustomerResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};