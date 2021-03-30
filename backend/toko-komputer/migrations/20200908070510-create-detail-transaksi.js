'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail_transaksi', {
      transaksi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transaksi",
          key: "transaksi_id"
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "product_id"
        }
      },
      qty: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail_transaksi');
  }
};