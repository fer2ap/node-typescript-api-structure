import { UserModel } from '@models/users/user.model';
import { connect, disconnect } from '../database';

export const createDummyData = async () => {
	await connect();
	
	const users = [
		{
			name: 'Emma',
			email: 'Emma@gmail.com',
			password: 'Emma123'
		},
		{
			name: 'Elise',
			email: 'Elise@gmail.com',
			password: 'Elise123'
		},
		{
			name: 'Jack',
			email: 'Jack@gmail.com',
			password: 'Jack123'
		},
		{
			name: 'Ethan',
			email: 'Ethan@gmail.com',
			password: 'Ethan123'
		},
		{
			name: 'Oliver',
			email: 'Oliver@gmail.com',
			password: 'Oliver123'
		},
		{
			name: 'Jamie',
			email: 'Jamie@gmail.com',
			password: 'Jamie123'
		},
		{
			name: 'Aidan',
			email: 'Aidan@gmail.com',
			password: 'Aidan123'
		},
		{
			name: 'Erin',
			email: 'Erin@gmail.com',
			password: 'Erin123'
		}
	];
	
	try {
		for (const user of users) {
			await UserModel.create(user);
			console.log(`Created user ${user.name}: ${user.email}`);
		}
		
		disconnect();
	} catch (error) {
		console.log(error);
	}
};
