const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Products', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.TEXT,
    },
    imageFile: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Aquí cambiamos a DECIMAL y especificamos 10 dígitos en total, con 2 decimales
    },
    price_send: {
      type: DataTypes.DECIMAL(10, 2), // También cambiamos a DECIMAL para el precio de envío
    },
    category: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    descount: {
      type: DataTypes.STRING
    },
    backgroundColor: {
      type: DataTypes.STRING
    },
  });
};
