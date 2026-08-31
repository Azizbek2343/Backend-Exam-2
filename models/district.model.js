const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const District = sequelize.define('District', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    });

    return District;
};