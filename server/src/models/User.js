const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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
    razon_social: {
      type: DataTypes.STRING,
    },

    ruc: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    contact_person: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    
    genre: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    email_additional: {
      type: DataTypes.STRING,
    },

    
    country: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    
    district: {
      type: DataTypes.STRING,
    },
    
  
    
    phone: {
      type: DataTypes.STRING
    },
   
    password: {
      type: DataTypes.STRING,
    },
    backgroundColor: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.Order, // Aquí cambiamos 'Orders' a 'Order'
        key: 'id',
      },
    },

    successPayment: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.SuccessPayment, 
        key: 'id',
      },
    },
  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });

  

  return User;
};
