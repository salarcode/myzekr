import { combineReducers } from 'redux';
import { AppState } from '../store';
import { settingsReducer } from './SettingsReducer';

export const rootReducer = combineReducers<AppState>({
	settingsState: settingsReducer,
});
