const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clothtb', {
    csn: {
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
    clothCat: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    clothName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    clothGen: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "A"
    },
    clothText: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'clothtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "csn" },
        ]
      },
      {
        name: "fk_clothTB_weatherTB1_idx",
        using: "BTREE",
        fields: [
          { name: "wsn" },
        ]
      },
    ]
  });
};
