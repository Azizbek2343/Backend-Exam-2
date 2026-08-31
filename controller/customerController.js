const { Customer } = require("../models");
const { validateCustomer } = require("../validation/customerValidation");
const { Op } = require("sequelize");

exports.createCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.create(req.body);
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");
        
        await customer.update(req.body);
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");

        const deletedData = customer.toJSON();
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
                ],
            },
        });

        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};