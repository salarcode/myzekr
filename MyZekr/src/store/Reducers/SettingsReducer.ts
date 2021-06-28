import { Reducer } from 'redux';
import {
	Action_ReadingSettings,
	Action_ReadSettings,
	Action_SaveSettings,
	Action_SavingSettings,
	SettingsActions,
} from '../Actions/SettingsActions';
import { SettingsState } from '../store';

const initialSettingsState: SettingsState = {
	loading: false,
	settings: undefined,
	userInformation: undefined,
};

const neverReached = (never: never) => {};

export const settingsReducer: Reducer<SettingsState, SettingsActions> = (state = initialSettingsState, action): any => {
	switch (action.type) {
		case Action_ReadingSettings: {
			return {
				...state,
				settings: null,
				userInformation: null,
				loading: true,
			};
		}
		case Action_ReadSettings: {
			return {
				...state,
				settings: action.settings,
				userInformation: action.userInformation,
				loading: false,
			};
		}
		case Action_SavingSettings: {
			return {
				...state,
				loading: true,
			};
		}
		case Action_SaveSettings: {
			return {
				...state,
				loading: false,
			};
		}
		default:
			neverReached(action);
	}
	return state;
};
