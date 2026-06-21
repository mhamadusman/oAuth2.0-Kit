import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
} from "sequelize";
import sequelize from "../config/config.database";

class Verification extends Model<
  InferAttributes<Verification>,
  InferCreationAttributes<Verification>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare verificationToken: string;
  declare expiredAt: Date;
  declare createdAt: CreationOptional<Date>;
}

Verification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "verification",
    tableName: "verification",
    updatedAt: false,
  }
);

export default Verification;

