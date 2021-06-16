import './BookmarkZekrButton.scss';
import React, { FC, Fragment, MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';
import { VersionNumber } from '../../components/VersionNumber';
import { AboutDialog } from '../AboutDialog/AboutDialog';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store/store';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator, saveSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AnyAction } from 'redux';
import { getZekrUrl } from '../../services/UrlService';
import { enableBootstrapToast } from '../../common/EnableBootstrapToast';

interface Props {
	zekr: Zekr;
	settings?: AppSettings;
	settingsLoading: boolean;
	saveSettings: (settings: AppSettings) => void;
}

// variable is used because saveSettings is resetting the bookmark value
var bookmarked = false;

const BookmarkZekrButton: FC<Props> = ({ zekr, settingsLoading, settings, saveSettings }) => {
	useEffect(() => {
		// reset Bookmarked value once!
		bookmarked = false;
	}, []);

	function displayToast(message: string) {
		var bodyElm = document.querySelector<HTMLElement>('#bookmark-zekr-button-toast .toast-body');
		if (bodyElm) {
			bodyElm.innerText = message;
		}

		enableBootstrapToast('bookmark-zekr-button-toast');
	}

	function onBookmarkClick(e: any) {
		e.preventDefault();
		if (!settings) return;

		//settings.bookmarks
		if (settings.userFavorites == null) {
			settings.userFavorites = [];
		}

		var existing = settings.userFavorites.find((f) => f.zekrUid == zekr.uid);
		if (existing) {
			displayToast('این صفحه قبلا در لیست علاقه مندی ها وجود دارد');
			return;
		} else {
			settings.userFavorites.push({
				zekrUid: zekr.uid,
			});
		}

		bookmarked = true;
		saveSettings(settings);

		setTimeout(() => {
			displayToast('به لیست علاقه مندی ها اضافه شد');
		}, 400);
	}

	return (
		<Fragment>
			<div
				id="bookmark-zekr-button-toast"
				className="hide toast align-items-center text-white bg-success border-0 position-fixed bottom-0 start-50  translate-middle-x"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div className="d-flex">
					<div className="toast-body">به لیست علاقه مندی ها اضافه شد</div>
					<button
						type="button"
						className="btn-close btn-close-white me-2 m-auto"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
			</div>
			{settings && (
				<a href="#bookmark" onClick={onBookmarkClick}>
					<img
						src="/assets/icons/add-favourite.svg"
						className={'icon-28 ' + (bookmarked ? 'animate-bookmark-button' : '')}
					/>
				</a>
			)}
		</Fragment>
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
		saveSettings: (settings: AppSettings) => dispatch(saveSettingsActionCreator(settings)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkZekrButton);
