const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Restaurant = sequelize.define('Restaurant', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        imageFile: {
            type: DataTypes.ARRAY(DataTypes.STRING),

        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,

        },

        address_optional: {
            type: DataTypes.STRING,

        },

        phone: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,

        },

        details: {
            type: DataTypes.STRING,

        }

    });
    return Restaurant
};
