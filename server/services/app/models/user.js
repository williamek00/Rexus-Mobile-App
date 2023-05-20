'use strict';
const {
  Model
} = require('sequelize');
const { hashedPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product,{foreignKey:"authorId"})
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Username cannot be null",
        notEmpty:"Username cannot be empty"
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:"Email cannot be null",
        notEmpty:"Email cannot be empty",
        isEmail:true
      },
     
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Password cannot be null",
        notEmpty:"Password  be empty",
        min:{
          args:[5],
          msg:"Minimum 5 characters required in password"
     }
      },
      
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Role cannot be null",
        notEmpty:"Role cannot be empty"
      },
      defaultValue:"admin"
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Phone Number cannot be null",
        notEmpty:"Phone Number cannot be empty"
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Address cannot be null",
        notEmpty:"Address cannot be empty"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user) => {
        user.password = hashedPassword(user.password)
      }
    }
  });
  return User;
};