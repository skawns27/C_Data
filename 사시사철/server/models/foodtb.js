const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foodtb', {
    fsn: {
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
    foodCat: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    foodName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    todayPty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'foodtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fsn" },
        ]
      },
      {
        name: "fk_foodTB_weatherTB1_idx",
        using: "BTREE",
        fields: [
          { name: "wsn" },
        ]
      },
    ]
  });
};
