import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { UserInformation } from '../../services/Settings/models/UserInformation';
import { readSettingsFromServer, saveSettingsInServer } from '../../services/Settings/settings';
import { readUserInformationFromServer, saveUserInformationInServer } from '../../services/Settings/userInformation';

export const Action_ReadSettings = 'ReadSettings';
export const Action_ReadingSettings = 'ReadingSettings';
export const Action_SaveSettings = 'SaveSettings';
export const Action_SavingSettings = 'SavingSettings';

interface ReadingSettingsAction extends Action<typeof Action_ReadingSettings> {
	[key: string]: unknown;
}
interface ReadSettingsAction extends Action<typeof Action_ReadSettings> {
	settings: AppSettings;
	userInformation: UserInformation;
	[key: string]: unknown;
}
interface SavingSettingsAction extends Action<typeof Action_SavingSettings> {
	[key: string]: unknown;
}
interface SaveSettingsAction extends Action<typeof Action_SaveSettings> {
	[key: string]: unknown;
}

export type SettingsActions = ReadSettingsAction | SaveSettingsAction | ReadingSettingsAction | SavingSettingsAction;

export const readSettingsActionCreator: ActionCreator<ThunkAction<Promise<void>, object, object, SettingsActions>> = () => {
	return async (dispatch: ThunkDispatch<object, object, SettingsActions>) => {
		const readingSettingsAction: ReadingSettingsAction = {
			type: Action_ReadingSettings,
		};

		dispatch(readingSettingsAction);

		// TODO - get the questions from server
		const settings = await readSettingsFromServer();
		const userInformation = await readUserInformationFromServer();

		// TODO - dispatch the GotUnansweredQuestions action
		const readSettingsAction: ReadSettingsAction = {
			type: Action_ReadSettings,
			settings: settings,
			userInformation: userInformation,
		};
		dispatch(readSettingsAction);
	};
};

export const saveSettingsActionCreator: ActionCreator<ThunkAction<Promise<void>, object, object, SettingsActions>> = (
	settings: AppSettings,
	userInfo: UserInformation | undefined,
) => {
	return async (dispatch: ThunkDispatch<object, object, SettingsActions>) => {
		const savingSettingsAction: SavingSettingsAction = {
			type: Action_SavingSettings,
		};
		dispatch(savingSettingsAction);

		// TODO - get the questions from server
		await saveSettingsInServer(settings);
		if (userInfo) {
			await saveUserInformationInServer(userInfo);
		}

		// TODO - dispatch the GotUnansweredQuestions action
		const saveSettingsAction: SaveSettingsAction = {
			type: Action_SaveSettings,
		};
		dispatch(saveSettingsAction);
	};
};
