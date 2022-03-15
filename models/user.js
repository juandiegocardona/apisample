const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class User extends Model {}

Movie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
  }
);

User.sync();

module.exports = User;