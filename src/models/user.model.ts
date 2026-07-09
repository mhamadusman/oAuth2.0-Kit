import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/config.database.js";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: CreationOptional<string | null>;
  declare refreshToken: CreationOptional<string | null>;
  declare profileImage: CreationOptional<string | null>
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare isEmailVerified: CreationOptional<boolean>
}
User.init(
  {
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage:{
        type: DataTypes.STRING,
        allowNull: true

    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,      
    modelName: "User", 
    tableName: "users", 
    timestamps: true,   
  }
);

export default User;