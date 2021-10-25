const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('colortb', {
    clsn: {
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
    colorName: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    colorText: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    todaySky: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'colortb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clsn" },
        ]
      },
      {
        name: "fk_colorTB_weatherTB1_idx",
        using: "BTREE",
        fields: [
          { name: "wsn" },
        ]
      },
    ]
  });
};
