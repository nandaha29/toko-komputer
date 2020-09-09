'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  detail_transaksi.init({
    transaksi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    qty: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: "detail_transaksi",
  });
  // create relation
  detail_transaksi.associate = (models) => {
    detail_transaksi.belongsTo(models.product,{foreignKey: "product_id", as: "product"})
    
  }
  return detail_transaksi;
};