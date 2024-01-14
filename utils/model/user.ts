import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
	public id!: string;
	public name!: string;
	public email!: string;
	public firstName!: string;
	public lastName!: string;
	public password!: string;
	public isAdmin!: boolean;
}

User.init(
	{
		id: {
			type: DataTypes.UUID, // Use UUID data type
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		firstName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		lastName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		tableName: "users",
		// schema: "library",
	},
);

export default User;
