const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Gender = sequelize.define('Gender', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    });

    return Gender;
};