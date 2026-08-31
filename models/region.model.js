const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Region = sequelize.define('Region', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Region;
};