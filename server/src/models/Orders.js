const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Orders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    product: {
      type: DataTypes.STRING,
    },
    oneSize  : {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    price_total: {
      type: DataTypes.DECIMAL(10, 2), // Aquí cambiamos a DECIMAL y especificamos 10 dígitos en total, con 2 decimales


    },
  

      direction_1: {
        type: DataTypes.STRING,
      },
      direction_2: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
 

    

    
  



  },);
};
