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
        local: {
            type: DataTypes.STRING,

        },
        

        horarios: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
          },
          

        details: {
            type: DataTypes.STRING(3000),

        }

    });
    return Restaurant
};
