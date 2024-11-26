// models/SuccessPayment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SuccessPayment = sequelize.define('SuccessPayment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
   
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },

    observation: {
      type: DataTypes.STRING,
    },
    date_payment: {
      type: DataTypes.DATE,
    },
    
    status: {
      type: DataTypes.STRING,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
    }


  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });

  return SuccessPayment;
};
