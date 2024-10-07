const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Claims = sequelize.define('Claims', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name_complete: {
      type: DataTypes.STRING,

    },
    dni: {
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
    identify_contract: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    description: {
      type: DataTypes.STRING,
    },
    monto_claim: {
      type: DataTypes.STRING,
    },
    application: {
      type: DataTypes.STRING,
    },

    description_problem: {
        type: DataTypes.STRING,
      },
      expected_solution: {
        type: DataTypes.STRING,
      },

      date: {
        type: DataTypes.STRING,
      },

      hour: {
        type: DataTypes.STRING,
      },
      name_tutor: {
        type: DataTypes.STRING,
      },
      address_tutor: {
        type: DataTypes.STRING,
      },


      phone_tutor: {
        type: DataTypes.STRING,
      },

      email_tutor: {
        type: DataTypes.STRING,
      },
      

      
  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });



  return Claims;
};
