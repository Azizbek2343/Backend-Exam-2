const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Types = sequelize.define('Types', {
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

    return Types;
};