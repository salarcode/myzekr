import { AnyAction } from 'redux';
import React, { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator, saveSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AppState } from '../../store/store';
import './FavoritesPage.scss';
import { connect } from 'react-redux';
import { ZekrListSearchable } from '../../containers/ZekrListSearchable/ZekrListSearchable';
import { BackButton } from '../../components/BackButton/BackButton';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { getZekrIndexList } from '../../services/Zekr/ZekrWebService';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import HomeImage from '../../assets-offline/icons/home.svg';

interface Props extends RouteComponentProps {
	settings: AppSettings | undefined;
	settingsLoading: boolean;
	readSettings: () => void;
	saveSettings: (settings: AppSettings) => void;
}

const FavoritesPage: FC<Props> = ({ settings, settingsLoading, readSettings, saveSettings }) => {
	function saveChanges() {
		if (settings) saveSettings(settings);
	}

	const [loading, setLoading] = useState<boolean>(true);
	const [zekrIndexList, setZekrIndexList] = useState<ZekrIndex[]>([]);
	const [zekrFavorites, setZekrFavorites] = useState<ZekrIndex[]>([]);

	useEffect(() => {
		async function doGetZekrList() {
			setLoading(true);
			let loadedZekrIndexList = await getZekrIndexList();

			if (loadedZekrIndexList) {
				setZekrIndexList(loadedZekrIndexList);
			}

			setLoading(false);

			reloadZekrFavorites();
		}
		doGetZekrList();
	}, []);

	function onRemoveClick(zekr: ZekrIndex) {
		if (!zekr) return;

		if (!settings || !zekrIndexList || !zekrIndexList.length) return;

		// if already removed
		if (!zekrFavorites.length) return;
		var userFavList = settings.userFavorites;

		var zekrIndex = userFavList.findIndex((z) => z.zekrUid == zekr.uid);
		if (zekrIndex >= 0) {
			var confirmed = window.confirm('آیا واقعا مایل به حذف هستید؟');
			if (!confirmed) return;

			userFavList.splice(zekrIndex, 1);

			saveChanges();
			reloadZekrFavorites(true);
		}
	}

	function reloadZekrFavorites(forceReload = false) {
		if (loading || settingsLoading) return;
		if (!settings || !zekrIndexList || !zekrIndexList.length) return;

		// if already extracted
		if (zekrFavorites.length && !forceReload) return;

		if (settings.userFavorites) {
			var foundZekr: ZekrIndex[] = [];

			for (const fav of settings.userFavorites) {
				var zekr = zekrIndexList.find((z) => z.uid == fav.zekrUid);
				if (zekr) {
					foundZekr.push(zekr);
				} else {
					// TODO: remove the bookmark as it is invalid!
					console.warn('Favourite not found!', fav.zekrUid);
				}
			}
			if (foundZekr.length || forceReload) {
				setZekrFavorites(foundZekr);
			}
		}
	}

	// run at every render
	reloadZekrFavorites();

	return settingsLoading || !settings ? (
		settingsLoading ? (
			<Loading />
		) : (
			<ErrorMessage retry={retryType.reloadPage} />
		)
	) : (
		<div>
			<PageMeta title="لیست علاقه مندی ها" description="مشاهده و مدیریت لیست علاقه مندی های شما" />
			<div className="sticky-inline-header">
				<div className="block-cell">
					<div className="page-inline-header">
						<div className="inline-breadcrumbs hidden-xs">
							{/* ---------- */}
							<span className="breadcrumbs-list">
								<span className="breadcrumb-item">
									<Link to="/" aria-label="صفحه اصلی">
										<img src={HomeImage} className="icon-20" alt="خانه" />
									</Link>
								</span>
							</span>
						</div>
						<div className="inline-title">
							<i className="fas fa-heart text-danger"></i> لیست علاقه مندی ها
						</div>
						<div className="inline-actions">
							<BackButton />
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="block-cell">
					<div className="out-breadcrumbs visible-xs">
						<span className="breadcrumbs-list">
							<span className="breadcrumb-item">
								<Link to="/" aria-label="صفحه اصلی">
									<img src={HomeImage} className="icon-20" alt="خانه" />
								</Link>
							</span>
						</span>
					</div>
					<div className="mb-4"></div>
				</div>
			</div>
			<ZekrListSearchable
				textBoxId="favorites-page-zekr"
				sectionTitle="لیست علاقه مندی ها"
				zekrList={zekrFavorites}
				displayRemoveButton={true}
				onRemoveClick={onRemoveClick}
			/>
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
		saveSettings: (settings: AppSettings) => dispatch(saveSettingsActionCreator(settings)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
