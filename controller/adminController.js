const { Admin } = require("../models");
const { validateAdmin } = require("../validation/adminValidation");
const { Op } = require("sequelize");

exports.createAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const admin = await Admin.create(req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");
        
        await admin.update(req.body);
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");

        const deletedData = admin.toJSON();
        await admin.destroy();
        
        res.status(200).send(deletedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchAdmins = async (req, res) => {
    try {
        const query = req.query.query || req.body.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const searchConditions = [
            { name: { [Op.iLike]: `%${query}%` } },
            { login: { [Op.iLike]: `%${query}%` } }
        ];

        if (!isNaN(query)) {
            searchConditions.push({ id: Number(query) });
        }

        const admins = await Admin.findAll({
            where: { [Op.or]: searchConditions },
        });

        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send(error.message);
    }
};