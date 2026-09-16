import { combineReducers } from 'redux';
import { settingsReducer } from './SettingsReducer';

export const rootReducer = combineReducers({
	settingsState: settingsReducer,
});
