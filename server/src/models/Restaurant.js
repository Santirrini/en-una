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

        logo: {
            type: DataTypes.STRING,

        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
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

        maximum_per_table: {
            type: DataTypes.STRING,

        },

        maximum_person_per_table: {
            type: DataTypes.STRING,

        },

        minimum_consumption: {
            type: DataTypes.STRING,

        },

        type_of_meals: {
            type: DataTypes.STRING,

        },

        average_price: {
            type: DataTypes.STRING,

        },
        district: {
            type: DataTypes.STRING,

        },


        horarios: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
        },

        area: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []

        },

        additional_services: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []

        },

        details: {
            type: DataTypes.STRING(3000),

        },

        facebook: {
            type: DataTypes.STRING,

        },
        instagram: {
            type: DataTypes.STRING,
        },
        tiktok: {
            type: DataTypes.STRING,

        },
        youtube: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },

        category: {
            type: DataTypes.STRING,
        },
        codeId: {
            type: DataTypes.STRING, // Cambiar a UUID para que coincida con el tipo de Codes.id
            references: {
              model: 'Codes', // Nombre de la tabla en la base de datos
              key: 'id',
            },
        },

   
   
    }, );
    return Restaurant
};
