const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const { validateAdmin } = require("../validation/adminValidation");
const { Op } = require("sequelize");

exports.createAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        if (req.body.hashed_password) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_password = await bcrypt.hash(req.body.hashed_password, salt);
        }

        if (req.body.hashed_refresh_token) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_refresh_token = await bcrypt.hash(req.body.hashed_refresh_token, salt);
        }

        const admin = await Admin.create(req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).send("Login va password kiritilishi shart");
        }

        const admin = await Admin.findOne({ where: { login } });
        if (!admin) return res.status(400).send("Login yoki parol noto'g'ri");

        const isValidPassword = await bcrypt.compare(password, admin.hashed_password);
        if (!isValidPassword) return res.status(400).send("Login yoki parol noto'g'ri");

        if (!admin.is_active) {
            return res.status(403).send("Admin faol emas");
        }

        const payload = { id: admin.id, login: admin.login, is_creator: admin.is_creator };

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        const salt = await bcrypt.genSalt(10);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        admin.hashed_refresh_token = hashedRefreshToken;
        await admin.save();

        res.status(200).send({
            id: admin.id,
            name: admin.name,
            login: admin.login,
            accessToken,
            refreshToken,
        });
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

        if (req.body.hashed_password) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_password = await bcrypt.hash(req.body.hashed_password, salt);
        }

        if (req.body.hashed_refresh_token) {
            const salt = await bcrypt.genSalt(10);
            req.body.hashed_refresh_token = await bcrypt.hash(req.body.hashed_refresh_token, salt);
        }

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