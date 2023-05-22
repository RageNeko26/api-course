import Orm from '../ConfigDB';

const { DataTypes: TypeUser } = require('sequelize');

export const User: any = Orm.define('sus_users', {
	email: {
		type: TypeUser.STRING(20),
		allowNull: false,
	},
	password: {
		type: TypeUser.STRING(255),
		allowNull: false,
	},
	name: {
		type: TypeUser.STRING(50),
		allowNull: false,
	},
	role: {
		type: TypeUser.INTEGER(2),
		allowNull: false,
		defaultValue: 0
	}
})

export const checkUserModel = async(): Promise<void> => {
	try {
		await Orm.authenticate();
	} catch(err) {
		console.log(`Failed to connect database ${err}`);
	}
}

export const syncUserModel = async(): Promise<void> => {
	try {
		await Orm.sync();
	} catch (err) {
		console.log(`Can't create table sus_users`);
	}
}