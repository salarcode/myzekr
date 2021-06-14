import { retrieveStorageItem, saveStorageItem } from '../Storage';
import { getUserInformationInitial, UserInformation } from './models/UserInformation';

const UserInformationStorageKey = 'UserInformation_Local';

export async function readUserInformationFromServer(): Promise<UserInformation> {
	var userInfo = await retrieveStorageItem<UserInformation>(UserInformationStorageKey);
	if (userInfo == null) {
		userInfo = getUserInformationInitial();
	} else {
		let completeSettings = getUserInformationInitial();

		// making sure object structure is intact
		Object.assign(completeSettings, userInfo);
		userInfo = completeSettings;
	}

	return userInfo;
}

export async function saveUserInformationInServer(userInfo: UserInformation) {
	console.log('saveUserInformationInServer', userInfo);
	await saveStorageItem(UserInformationStorageKey, userInfo);
}
