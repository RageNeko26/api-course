import Orm from '../ConfigDB'

const { DataTypes }: any = require('sequelize')

export const Course: any = Orm.define('sus_course', {
	title: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	yt_url: {
		type: DataTypes.STRING(250),
		allowNull: false
	}
})

export const checkCourseModel = async(): Promise<void> => {
	try {
		await Orm.authenticate();
	} catch(err) {
		console.log('Failed to connect to database')
	}
}

export const syncCourseModel = async(): Promise<void> => {
	try {
		await Orm.sync();
	} catch(err ){
		console.log(err);
	}
}

