import { AnyAction } from 'redux';
import { FC, Fragment, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { getZekrIndexList } from '../../services/Zekr/ZekrWebService';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import { ZekrListSummary } from '../ZekrListSummary/ZekrListSummary';
import MoreButtonImage from '../../assets-offline/icons/more-rewind.svg';

interface Props {
	settings: AppSettings | undefined;
	settingsLoading: boolean;
	readSettings: () => void;
	sectionTitle?: string;
	displayLimit?: number;
}

const ZekrListFavorites: FC<Props> = ({
	settings,
	readSettings,
	settingsLoading,
	sectionTitle = 'لیست علاقه مندی ها',
	displayLimit,
}) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [zekrIndexList, setZekrIndexList] = useState<ZekrIndex[]>([]);
	const [zekrFavorites, setZekrFavorites] = useState<ZekrIndex[]>([]);

	if (!displayLimit) {
		// default limit to show search box
		displayLimit = 3;
	}

	useEffect(() => {
		async function doGetZekrList() {
			setLoading(true);
			let loadedZekrIndexList = await getZekrIndexList();

			if (loadedZekrIndexList) {
				setZekrIndexList(loadedZekrIndexList);
			}

			setLoading(false);
		}
		if (settings === null) {
			readSettings();
		}
		doGetZekrList();
	}, []);

	if (settings != null && !settings.homePage.displayFavorites) {
		// do not render if not enabled
		return <Fragment />;
	}

	reloadZekrFavorites();

	function reloadZekrFavorites(forceReload = false) {
		if (loading) return;
		if (!settings || !zekrIndexList || !zekrIndexList.length) return;

		// if already extracted
		if (zekrFavorites.length && !forceReload) return;

		if (settings.userFavorites) {
			var foundZekr: ZekrIndex[] = [];

			for (const fav of settings.userFavorites) {
				var zekr = zekrIndexList.find((z) => z.uid == fav.zekrUid);
				if (zekr) {
					foundZekr.push(zekr);

					// limit the display
					if (displayLimit && foundZekr.length >= displayLimit) {
						break;
					}
				}
			}
			if (foundZekr.length || forceReload) {
				setZekrFavorites(foundZekr);
			}
		}
	}

	return loading || settingsLoading ? (
		<Loading />
	) : (
		<Fragment>
			{zekrFavorites.length > 0 && (
				<section className="main-section">
					<h3 className="main-section-title title-with-tools">
						<span className="no-wrap">{sectionTitle}</span>
					</h3>
					<div className="">
						<ZekrListSummary
							data={zekrFavorites}
							displayMoreButton={true}
							moreButtonText="مشاهده همه"
							moreButtonLink="/favorites"
							moreButtonImage={<img className="icon-16 mx-1 button-icon" src={MoreButtonImage} alt="<<" />}
						/>
					</div>
				</section>
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ZekrListFavorites);
