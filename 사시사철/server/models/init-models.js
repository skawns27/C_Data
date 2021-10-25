var DataTypes = require("sequelize").DataTypes;
var _clothtb = require("./clothtb");
var _colortb = require("./colortb");
var _foodtb = require("./foodtb");
var _itemtb = require("./itemtb");
var _weathertb = require("./weathertb");

function initModels(sequelize) {
  var clothtb = _clothtb(sequelize, DataTypes);
  var colortb = _colortb(sequelize, DataTypes);
  var foodtb = _foodtb(sequelize, DataTypes);
  var itemtb = _itemtb(sequelize, DataTypes);
  var weathertb = _weathertb(sequelize, DataTypes);

  clothtb.belongsTo(weathertb, { as: "wsn_weathertb", foreignKey: "wsn"});
  weathertb.hasMany(clothtb, { as: "clothtbs", foreignKey: "wsn"});
  colortb.belongsTo(weathertb, { as: "wsn_weathertb", foreignKey: "wsn"});
  weathertb.hasMany(colortb, { as: "colortbs", foreignKey: "wsn"});
  foodtb.belongsTo(weathertb, { as: "wsn_weathertb", foreignKey: "wsn"});
  weathertb.hasMany(foodtb, { as: "foodtbs", foreignKey: "wsn"});
  itemtb.belongsTo(weathertb, { as: "wsn_weathertb", foreignKey: "wsn"});
  weathertb.hasMany(itemtb, { as: "itemtbs", foreignKey: "wsn"});

  return {
    clothtb,
    colortb,
    foodtb,
    itemtb,
    weathertb,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
