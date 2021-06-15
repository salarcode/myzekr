import './Layout.scss';
import React, { FC, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { readSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AppState } from '../../store/store';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { connect } from 'react-redux';
import SidebarAppDrawer from './SidebarAppDrawer';
import { AboutDialog } from '../AboutDialog/AboutDialog';
import { ShareItDialog } from '../ShareItDialog/ShareItDialog';

interface Props {
	settings?: AppSettings | undefined;
	settingsLoading?: boolean;
	readSettings: () => Promise<void>;
}

const Layout: FC<Props> = ({ children, settings, readSettings, settingsLoading = false }) => {
	useEffect(() => {
		// Warning: this is the only place we load the settings, don't touch!
		if (readSettings) readSettings();
	}, [readSettings]);

	return (
		<div className="layout block-container myzekr-layout">
			<div className="site-header-row">
				<Header />
			</div>
			<div className="content-layout-row">
				<div className="content-layout block-container">{children}</div>
				<AboutDialog />
				<ShareItDialog />
			</div>
			<div>
				<div className="block-cell">
					<Footer />
				</div>
			</div>
			<SidebarAppDrawer />
		</div>
	);
};

const mapStateToProps = (store: AppState) => {
	return {
		settings: store.settingsState.settings,
		settingsLoading: store.settingsState.loading,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		readSettings: () => dispatch(readSettingsActionCreator()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
