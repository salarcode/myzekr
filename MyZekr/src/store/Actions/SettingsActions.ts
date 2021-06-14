import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { UserInformation } from '../../services/Settings/models/UserInformation';
import { readSettingsFromServer, saveSettingsInServer } from '../../services/Settings/settings';
import { readUserInformationFromServer, saveUserInformationInServer } from '../../services/Settings/userInformation';

export const Action_ReadSettings = 'ReadSettings';
export const Action_ReadingSettings = 'ReadingSettings';
export const Action_SaveSettings = 'SaveSettings';
export const Action_SavingSettings = 'SavingSettings';

interface ReadingSettingsAction extends Action<typeof Action_ReadingSettings> {}
interface ReadSettingsAction extends Action<typeof Action_ReadSettings> {
	settings: AppSettings;
	userInformation: UserInformation;
}
interface SavingSettingsAction extends Action<typeof Action_SavingSettings> {}
interface SaveSettingsAction extends Action<typeof Action_SaveSettings> {}

export type SettingsActions = ReadSettingsAction | SaveSettingsAction | ReadingSettingsAction | SavingSettingsAction;

export const readSettingsActionCreator: ActionCreator<ThunkAction<Promise<void>, object, object, ReadSettingsAction>> = () => {
	return async (dispatch: Dispatch) => {
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

export const saveSettingsActionCreator: ActionCreator<ThunkAction<Promise<void>, object, object, SaveSettingsAction>> = (
	settings: AppSettings,
	userInfo: UserInformation | undefined,
) => {
	return async (dispatch: Dispatch) => {
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
