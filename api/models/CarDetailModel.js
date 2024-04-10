const conn = require("../connect");
const { DataTypes } = require("sequelize");

const CarDetailModel = conn.define("carDetail", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING(255),
  },
  brand: {
    type: DataTypes.STRING(255),
  },
  model: {
    type: DataTypes.STRING(255),
  },
  note: {
    type: DataTypes.STRING(255),
  },
  etc: {
    type: DataTypes.STRING(255),
  },
});

CarDetailModel.sync({ alter: true });
module.exports = CarDetailModel;
