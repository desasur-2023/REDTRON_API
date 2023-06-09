import { DataTypes, Sequelize } from "sequelize";

export default (sequealize:Sequelize) => {
    const LoginUser = sequealize.define("LoginUser", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    },{ timestamps: false })
}