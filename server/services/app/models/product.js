'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User,{foreignKey:"authorId"})
      Product.belongsTo(models.Category,{foreignKey:"categoryId"})
      Product.hasMany(models.Image,{foreignKey:"productId"})
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Name cannot be null",
        notEmpty:"Name cannot be empty"
      }
    },
    slug: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:"Slug cannot be null",
        notEmpty:"Slug cannot be empty"
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:"Description cannot be null",
        notEmpty:"Description cannot be empty"
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:"Price image cannot be null",
        notEmpty:"Price image cannot be empty",
        min:{
          args:[50000],
          msg:"Price must be at least 50000"
     }
      }
    },
    mainImg: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:"Main image cannot be null",
        notEmpty:"Main image cannot be empty"
      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};