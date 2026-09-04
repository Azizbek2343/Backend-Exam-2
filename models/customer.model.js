const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'customer',
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.Cart, {
            foreignKey: "customer_id",
            as: "carts",
        });

        Customer.hasMany(models.CustomerCard, {
            foreignKey: "customer_id",
            as: "customer_cards",
        });

        Customer.hasMany(models.CustomerAddress, {
            foreignKey: "customer_id",
            as: "customer_addresses",
        });

        Customer.belongsTo(models.Gender, {
            foreignKey: "gender_id",
            as: "gender",
        });

        Customer.belongsTo(models.Lang, {
            foreignKey: "lang_id",
            as: "lang",
        });
    };

    return Customer;
};