import './SidebarAppDrawer.scss';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { VersionNumber } from '../../components/VersionNumber';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store/store';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator, saveSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AnyAction } from 'redux';
import TasbihImage from '../../assets-offline/icons/tasbih.svg';
import { canStackZekrBody } from '../../common/helpers/mediaQuery';

interface Props {
	settings?: AppSettings;
	settingsLoading: boolean;
	saveSettings: (settings: AppSettings) => void;
}

const SidebarAppDrawer: FC<Props> = ({ settingsLoading, settings, saveSettings }) => {
	function toggleSidebar() {
		document.getElementById('toggle-sidebar-app-drawer')?.click();
	}
	function displayAbout(e: any) {
		e.preventDefault();
		toggleSidebar();
		document.getElementById('toggle-about-modal')?.click();
	}
	function displayShareLink(e: any) {
		e.preventDefault();
		toggleSidebar();
		document.getElementById('toggle-shareit-modal')?.click();
	}

	function applyTheme(name: string) {
		if (!settings) return;
		settings.theme.name = name;
		saveChanges();
	}

	function saveChanges() {
		if (settings) saveSettings(settings);
	}
	const [colouredDiacritics, setColouredDiacritics] = useState<boolean>(settings?.colouredDiacritics || true);
	const [enableTranslations, setEnableTranslations] = useState<boolean>(settings?.enableTranslations || true);
	const [stackedZekrBody, setStackedZekrBody] = useState<boolean>(settings?.textSettings.stackedZekrBody || false);
	const [displayFavorites, setDisplayFavorites] = useState<boolean>(settings?.homePage.displayFavorites || true);
	const [displayTodayPlan, setDisplayTodayPlan] = useState<boolean>(settings?.homePage.displayTodayPlan || true);
	const [displayTodaySuggestions, setDisplayTodaySuggestions] = useState<boolean>(
		settings?.homePage.displayTodaySuggestions || true,
	);

	if (!settingsLoading && settings) {
		// update in each render
		if (colouredDiacritics != settings.colouredDiacritics) {
			setColouredDiacritics(settings.colouredDiacritics);
		}
		if (enableTranslations != settings.enableTranslations) {
			setEnableTranslations(settings.enableTranslations);
		}
		if (stackedZekrBody != settings?.textSettings.stackedZekrBody) {
			setStackedZekrBody(settings.textSettings.stackedZekrBody);
		}
		if (displayFavorites != settings.homePage.displayFavorites) {
			setDisplayFavorites(settings.homePage.displayFavorites);
		}
		if (displayTodayPlan != settings.homePage.displayTodayPlan) {
			setDisplayTodayPlan(settings.homePage.displayTodayPlan);
		}
		if (displayTodaySuggestions != settings.homePage.displayTodaySuggestions) {
			setDisplayTodaySuggestions(settings.homePage.displayTodaySuggestions);
		}
	}

	let themeName = settings?.theme.name;
	if (themeName === 'Normal') themeName = 'default';

	return (
		<div
			className="offcanvas offcanvas-start"
			tabIndex={-1}
			id="sidebar-app-drawer"
			aria-labelledby="sidebar-app-drawer-title"
			data-bs-scroll="false"
		>
			<button
				id="toggle-sidebar-app-drawer"
				style={{ display: 'none' }}
				data-bs-toggle="offcanvas"
				data-bs-target="#sidebar-app-drawer"
			/>
			<div className="offcanvas-header">
				<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">
				<div className="drawer-logo" data-bs-toggle="offcanvas" data-bs-target="#sidebar-app-drawer">
					<Link to="/" aria-label="صفحه اصلی">
						<img className="logo" src="/android-chrome-512x512.png" alt="MyZekr" />
					</Link>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkColouredDiacritics"
						checked={colouredDiacritics}
						onChange={(e) => {
							if (settings) {
								settings.colouredDiacritics = e.currentTarget.checked;
								saveChanges();
							}
							setColouredDiacritics(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkColouredDiacritics">
						حرکه گذاری رنگی
					</label>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkEnableTranslations"
						checked={enableTranslations}
						onChange={(e) => {
							if (settings) {
								settings.enableTranslations = e.currentTarget.checked;
								saveChanges();
							}
							setEnableTranslations(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkEnableTranslations">
						نمایش ترجمه
					</label>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkStackedZekrBody"
						disabled={!canStackZekrBody()}
						checked={stackedZekrBody}
						onChange={(e) => {
							if (settings) {
								settings.textSettings.stackedZekrBody = e.currentTarget.checked;
								saveChanges();
							}
							setStackedZekrBody(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkStackedZekrBody">
						<i className="fas fa-columns"></i> متن و ترجمه افقی
					</label>
				</div>
				<hr />

				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkDisplayFavorites"
						checked={displayFavorites}
						onChange={(e) => {
							if (settings) {
								settings.homePage.displayFavorites = e.currentTarget.checked;
								saveChanges();
							}
							setDisplayFavorites(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkDisplayFavorites">
						نمایش منتخب ها
					</label>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkDisplayTodayPlan"
						checked={displayTodayPlan}
						onChange={(e) => {
							if (settings) {
								settings.homePage.displayTodayPlan = e.currentTarget.checked;
								saveChanges();
							}
							setDisplayTodayPlan(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkDisplayTodayPlan">
						نمایش برنامه امروز
					</label>
				</div>
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="chkDisplayTodaySuggestions"
						checked={displayTodaySuggestions}
						onChange={(e) => {
							if (settings) {
								settings.homePage.displayTodaySuggestions = e.currentTarget.checked;
								saveChanges();
							}
							setDisplayTodaySuggestions(e.currentTarget.checked);
						}}
					/>
					<label className="form-check-label" htmlFor="chkDisplayTodaySuggestions">
						نمایش پیشنهاد امروز
					</label>
				</div>
				<hr />
				<div className="link-item" data-bs-toggle="offcanvas" data-bs-target="#sidebar-app-drawer">
					<Link to="/counter">
						<span className="link-icon text-danger">
							<img src={TasbihImage} alt="." className="icon-20" />
						</span>
						ذکر شمار
					</Link>
				</div>
				<div className="link-item" data-bs-toggle="offcanvas" data-bs-target="#sidebar-app-drawer">
					<Link to="/favorites">
						<span className="link-icon text-danger">
							<i className="fas fa-heart fa-lg"></i>
						</span>
						لیست علاقه مندی ها
					</Link>
				</div>
				<hr />
				<div className="link-item ">
					<div>رنگ بندی سایت</div>
					<div className="darkreader color-theme-container">
						<div
							onClick={() => applyTheme('default')}
							className={'color-theme default ' + (themeName === 'default' ? 'selected' : '')}
						></div>
						<div
							onClick={() => applyTheme('brown')}
							className={'color-theme brown ' + (themeName === 'brown' ? 'selected' : '')}
						></div>
						<div
							onClick={() => applyTheme('dark')}
							className={'color-theme dark ' + (themeName === 'dark' ? 'selected' : '')}
						></div>
					</div>
				</div>
				<hr />
				<div className="link-item ">
					<Link to="#" onClick={displayShareLink}>
						<span className="link-icon">
							<i className="fas fa-share-alt"></i>
						</span>
						پیشنهاد به دوستان
					</Link>
				</div>
				<div className="link-item ">
					<Link to="#" onClick={displayAbout}>
						<span className="link-icon">
							<i className="fas fa-info-circle"></i>
						</span>
						درباره
					</Link>
				</div>
				<div className="link-item text-center text-secondary form-text">
					نسخه: <VersionNumber />
				</div>
			</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SidebarAppDrawer);
