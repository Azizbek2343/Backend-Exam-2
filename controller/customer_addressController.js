const { CustomerAddress } = require("../models");
const { validateCustomerAddress } = require("../validation/customer_addressValidation");
const { Op } = require("sequelize");

exports.createCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customerAddress = await CustomerAddress.create(req.body);
        res.status(201).send(customerAddress);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerAddresses = async (req, res) => {
    try {
        const customerAddresses = await CustomerAddress.findAll();
        res.status(200).send(customerAddresses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerAddressById = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findByPk(req.params.id);
        if (!customerAddress) return res.status(404).send("Customer address not found");
        res.status(200).send(customerAddress);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const customerAddress = await CustomerAddress.findByPk(req.params.id);
        if (!customerAddress) return res.status(404).send("Customer address not found");
        
        await customerAddress.update(req.body);
        res.status(200).send(customerAddress);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCustomerAddress = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findByPk(req.params.id);
        if (!customerAddress) return res.status(404).send("Customer address not found");

        const deletedData = customerAddress.toJSON();
        await customerAddress.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchCustomerAddresses = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const customerAddresses = await CustomerAddress.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { street: { [Op.iLike]: `%${query}%` } },
                    { house: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(customerAddresses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};