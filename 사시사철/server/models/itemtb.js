const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('itemtb', {
    isn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wsn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'weathertb',
        key: 'wsn'
      }
    },
    itemName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    itemText: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    todayPty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'itemtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "isn" },
        ]
      },
      {
        name: "fk_itemTB_weatherTB1_idx",
        using: "BTREE",
        fields: [
          { name: "wsn" },
        ]
      },
    ]
  });
};
