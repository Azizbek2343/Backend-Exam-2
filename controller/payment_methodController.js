const { PaymentMethod } = require("../models");
const { validatePaymentMethod } = require("../validation/payment_methodValidation");
const { Op } = require("sequelize");

exports.createPaymentMethod = async(req, res) => {
    const { error } = validatePaymentMethod(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const paymentMethod = await PaymentMethod.create(req.body);
        res.status(201).send(paymentMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getPaymentMethods = async(req, res) => {
    try {
        const paymentMethods = await PaymentMethod.findAll();
        res.status(200).send(paymentMethods);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getPaymentMethodById = async(req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findByPk(req.params.id, {

        });
        if (!paymentMethod) return res.status(404).send("PaymentMethod not found");
        res.status(200).send(paymentMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const { error } = validatePaymentMethod(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const paymentMethod = await PaymentMethod.findByPk(req.params.id);
        if (!paymentMethod) return res.status(404).send("PaymentMethod not found");
        await paymentMethod.update(req.body);
        res.status(200).send(paymentMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = PaymentMethod.findByPk(req.params.id);
        if (!paymentMethod) return res.status(404).send("PaymentMethod not found");

        const paymentMethod = paymentMethod.toJSON();

        await paymentMethod.destroy();
        res.status(200).send(paymentMethod);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchPaymentMethods = async (req, res) => {
    try{
        console.log("Query received:", req.query.query);
        
        const { query } = req.body;
        if (!query) {
            return res.status(400).send("Search query is required");
    }

    const paymentMethods = await PaymentMethod.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${query}%` } },
            ],
        },
    });

    res.status(200).send(paymentMethods);
    } catch (error) {
        res.status(500).send(error.message);
    }
};