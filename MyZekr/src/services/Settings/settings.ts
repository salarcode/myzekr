import { retrieveStorageItem, saveStorageItem } from '../Storage';
import { AppSettings, getAppSettingsInitial } from './models/AppSettings';

const AppSettingsStorageKey = 'AppSettings_Local';

export async function readSettingsFromServer(): Promise<AppSettings> {
	var settings = await retrieveStorageItem<AppSettings>(AppSettingsStorageKey);
	if (settings == null) {
		settings = getAppSettingsInitial();
	} else {
		let completeSettings = getAppSettingsInitial();

		// making sure object structure is intact
		Object.assign(completeSettings, settings);
		settings = completeSettings;
	}

	return settings;
}

export async function saveSettingsInServer(settings: AppSettings) {
	console.log('saveSettingsInServer', settings);
	await saveStorageItem(AppSettingsStorageKey, settings);
}
