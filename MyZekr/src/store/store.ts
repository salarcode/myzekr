import {} from 'react';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppSettings } from '../services/Settings/models/AppSettings';
import { UserInformation } from '../services/Settings/models/UserInformation';
import { rootReducer } from './Reducers/rootReducer';

export interface SettingsState {
	readonly loading: boolean;
	readonly settings: AppSettings | undefined;
	readonly userInformation: UserInformation | undefined;
}

export interface AppState {
	readonly settingsState: SettingsState;
}

export function configureStore(): Store<AppState> {
	const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
	return store;
}
