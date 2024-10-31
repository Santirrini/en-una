const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Form = sequelize.define('Form', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        ruc: {
            type: DataTypes.STRING,
          },
        reason_social: {
            type: DataTypes.STRING,
          },
         

          busines_name: {
            type: DataTypes.STRING,
          },
          legal_representative: {
            type: DataTypes.STRING,
          },

          legal_representative_dni: {
            type: DataTypes.STRING,
          },
          legal_manager: {
            type: DataTypes.STRING,
          },
          local_address: {
            type: DataTypes.STRING,
          },
          
          phone_contact: {
            type: DataTypes.STRING,
          },
          local_phone: {
            type: DataTypes.STRING,
          },
         
          email_contract: {
            type: DataTypes.STRING,
          },

          status: {
            type: DataTypes.STRING,
          },
      
          
         
        }, {
          timestamps: false, // Desactiva los campos createdAt y updatedAt
        });
    return Form
};
