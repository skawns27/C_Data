const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weathertb', {
    wsn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weatherText: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    maxTemp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    minTemp: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'weathertb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wsn" },
        ]
      },
    ]
  });
};
