const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CustomerAddress = sequelize.define('CustomerAddress', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        district_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_index: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'customer_address',
    });

    return CustomerAddress;
};