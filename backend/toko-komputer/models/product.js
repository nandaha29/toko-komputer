'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
    tableName: "product"
  });
  return product;
};