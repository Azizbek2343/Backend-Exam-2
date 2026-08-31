const { DeliveryMethod } = require("../models");
const { validateDeliveryMethod } = require("../validation/delivery_methodValidation");
const { Op } = require("sequelize");

exports.createDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const deliveryMethod = await DeliveryMethod.create(req.body);
        res.status(201).send(deliveryMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getDeliveryMethods = async (req, res) => {
    try {
        const deliveryMethods = await DeliveryMethod.findAll();
        res.status(200).send(deliveryMethods);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getDeliveryMethodById = async (req, res) => {
    try {
        const deliveryMethod = await DeliveryMethod.findByPk(req.params.id);
        if (!deliveryMethod) return res.status(404).send("DeliveryMethod not found");
        res.status(200).send(deliveryMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethod(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const deliveryMethod = await DeliveryMethod.findByPk(req.params.id);
        if (!deliveryMethod) return res.status(404).send("DeliveryMethod not found");
        
        await deliveryMethod.update(req.body);
        res.status(200).send(deliveryMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteDeliveryMethod = async (req, res) => {
    try {
        const deliveryMethod = await DeliveryMethod.findByPk(req.params.id);
        if (!deliveryMethod) return res.status(404).send("DeliveryMethod not found");

        const deletedData = deliveryMethod.toJSON();
        await deliveryMethod.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchDeliveryMethods = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const deliveryMethods = await DeliveryMethod.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });

        res.status(200).send(deliveryMethods);
    } catch (error) {
        res.status(500).send(error.message);
    }
};