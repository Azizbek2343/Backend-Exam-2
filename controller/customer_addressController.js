const { CustomerAddress, Customer, Region, District, Flat } = require("../models");
const { validateCustomerAddress } = require("../validation/customer_addressValidation");
const { Op } = require("sequelize");

const formatCustomerAddressResponse = (customerAddress) => {
    if (!customerAddress) return null;
    const json = customerAddress.toJSON();

    return {
        id: json.id,
        customer: json.customer || json.Customer || null,
        name: json.name || null,
        region: json.region || json.Region || null,
        district: json.district || json.District || null,
        street: json.street || null,
        house: json.house || null,
        flat: json.flat || json.Flat || null,
        location: json.location || null,
        post_index: json.post_index || json.postIndex || null,
        info: json.info || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    };
};

const includeOptions = [
    { model: Customer, as: "customer" },
    { model: Region, as: "region" },
    { model: District, as: "district" },
    { model: Flat, as: "flat" }
];

exports.createCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let customerAddress = await CustomerAddress.create(req.body);
        customerAddress = await CustomerAddress.findByPk(customerAddress.id, { include: includeOptions });
        res.status(201).send(formatCustomerAddressResponse(customerAddress));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerAddresses = async (req, res) => {
    try {
        const customerAddresses = await CustomerAddress.findAll({ include: includeOptions });
        const formatted = customerAddresses.map(c => formatCustomerAddressResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCustomerAddressById = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findByPk(req.params.id, { include: includeOptions });
        if (!customerAddress) return res.status(404).send("Customer address not found");
        res.status(200).send(formatCustomerAddressResponse(customerAddress));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCustomerAddress = async (req, res) => {
    const { error } = validateCustomerAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        let customerAddress = await CustomerAddress.findByPk(req.params.id);
        if (!customerAddress) return res.status(404).send("Customer address not found");
        
        await customerAddress.update(req.body);
        customerAddress = await CustomerAddress.findByPk(customerAddress.id, { include: includeOptions });
        res.status(200).send(formatCustomerAddressResponse(customerAddress));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCustomerAddress = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findByPk(req.params.id, { include: includeOptions });
        if (!customerAddress) return res.status(404).send("Customer address not found");

        const deletedData = formatCustomerAddressResponse(customerAddress);
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
                    ...(isNaN(query) ? [] : [{ id: query }])
                ],
            },
            include: includeOptions
        });

        const formatted = customerAddresses.map(c => formatCustomerAddressResponse(c));
        res.status(200).send(formatted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};