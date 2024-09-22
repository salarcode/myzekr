import './ZekrPage.scss';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { Loading } from '../../components/Loading/Loading';
import { Zekr } from '../../services/Zekr/models/Zekr';
import { getZekrByUid, getZekrCategoryChainToTopByUid } from '../../services/Zekr/ZekrService';
import { ZekrBodyText } from '../../components/ZekrBodyText/ZekrBodyText';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { CategoryListSmallIcon } from '../../containers/CategoryList/CategoryListSmallIcon';
import { BackButton } from '../../components/BackButton/BackButton';
import { detectPositionSticky } from '../../common/helpers/positionSticky';
import BookmarkZekrButton from '../../containers/BookmarkZekrButton/BookmarkZekrButton';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import { ZekrInlineCounter } from '../../containers/ZekrInlineCounter/ZekrInlineCounter';
import TextZoomButtons from '../../containers/TextZoomButtons/TextZoomButtons';
import { ScrollTop } from '../../components/ScrollTop/ScrollTop';
import HomeImage from '../../assets-offline/icons/home.svg';
import IslamStarImage from '../../assets-offline/icons/islam-star.svg';
import TasbihImage from '../../assets-offline/icons/tasbih.svg';
import { ZekrVoicePlayer } from '../../components/ZekrVoicePlayer/ZekrVoicePlayer';

interface params {
	zekrUid: string;
}

interface Props extends RouteComponentProps<params> {
	settings: AppSettings | undefined;
	settingsLoading: boolean;
	readSettings: () => void;
}

const ZekrPage: FC<Props> = ({ history, match, settings, settingsLoading, readSettings }) => {
	const [zekr, setZekr] = useState<Zekr>();
	const [loading, setLoading] = useState<boolean>(true);
	const [categories, setCategories] = useState<ZekrCategory[] | undefined>();
	const [benefitsOpen, setBenefitsOpen] = useState<any>();
	const [voicePlayerOpen, setVoicePlayerOpen] = useState<boolean>(false);
	const [zekrCounterVisible, setZekrCounterVisible] = useState(false);

	var zekrUid = match.params.zekrUid;

	useEffect(() => {
		async function doGetZekr() {
			setLoading(true);

			var loadedZkr = await getZekrByUid(zekrUid).catch((err) => {
				console.warn('Failed to read zekr: ' + zekrUid, err);
			});

			if (loadedZkr) {
				let loadedCategoryChain = await getZekrCategoryChainToTopByUid(loadedZkr.category).catch((err) => {
					console.warn('Failed to read ZekrCategory for zekr: ' + zekrUid, err);
				});

				if (loadedCategoryChain) {
					setCategories(loadedCategoryChain);
					setZekr(loadedZkr);
				}
			}

			setLoading(false);
		}
		if (settings === null) {
			readSettings();
		}
		doGetZekr();

		detectPositionSticky('.sticky-inline-header');
		detectPositionSticky('.zekr-body-play-buttons');

		return closeZekrBenefits;
	}, [zekrUid, settings, readSettings]);

	function onReturnClick() {
		if (history.length > 2) {
			history.goBack();
		} else if (categories && categories.length > 0) {
		}
	}

	function openZekrBenefits() {
		setBenefitsOpen(document.getElementById('zekr-benefits-dialog'));
	}
	function closeZekrBenefits() {
		if (benefitsOpen) {
			benefitsOpen.modal('hide');
		}
		var backdrop = document.getElementsByClassName('modal-backdrop');
		for (let index = 0; index < backdrop.length; index++) {
			backdrop[index].remove();
		}
		var body = document.getElementsByTagName('body')[0];
		body.className = (body.className || '').replace('modal-open', '');
		body.setAttribute('style', '');
	}

	function onShowZekrCounter(e: React.MouseEvent<HTMLAnchorElement>) {
		e?.preventDefault();
		setZekrCounterVisible(true);
	}
	function onCloseZekrCounter() {
		setZekrCounterVisible(false);
	}
	function onVoicePlayerOpen(e: React.MouseEvent<HTMLAnchorElement>) {
		e?.preventDefault();
		setVoicePlayerOpen(true);
	}
	function onVoicePlayerClose(e: React.MouseEvent<HTMLAnchorElement>) {
		e?.preventDefault();
		setVoicePlayerOpen(false);
	}

	let benefitsCss = {};

	if (settings) {
		benefitsCss = {
			fontSize: settings.textSettings.benefitsFontSize,
		};
	}
	var showZekrCounter = zekr?.showZekrCounter || false;

	const zekrBenefitsDialog = () => (
		<div
			className="modal fade hide zekr-benefits-container"
			id="zekr-benefits-dialog"
			tabIndex={-1}
			aria-labelledby="zekr-benefits-dialog-title"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<div className="modal-title fw-bold" id="zekr-benefits-dialog-title">
							{'فضیلت ' + zekr?.fullName}
						</div>
						<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div className="modal-body">
						<div className="zekr-body-container">
							{zekr?.benefits?.map((body, index) => (
								<ZekrBodyText settings={settings} key={index} body={body} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	function getPageTitle(zekr: Zekr): string {
		if (!zekr) return '';

		var title = zekr?.metaTitle || zekr?.fullName || '';
		if (title.length < 60 && zekr.zekrVoices?.length > 0) {
			const suffix = ' (متنی و صوتی)';
			if (title.length + suffix.length > 60) {
				title += ` (صوتی)`;
			} else {
				title += suffix;
			}
		}
		if (title.length < 60) {
			if (categories && categories.length > 0) {
				title += ' - ' + categories[categories.length - 1].title;
			}
		}

		return title;
	}

	return loading || settingsLoading || !zekr ? (
		loading || settingsLoading ? (
			<Loading />
		) : (
			<ErrorMessage retry={retryType.reloadPage} />
		)
	) : (
		<div className="zekr-container">
			<PageMeta
				title={getPageTitle(zekr)}
				description={
					zekr.metaDescription ? zekr.metaDescription + ' - مشاهده ذکر و دعا' : 'مشاهده ذکر و دعا - ' + zekr?.fullName
				}
			/>
			<div className="sticky-inline-header">
				<div className="block-cell">
					<div className="page-inline-header">
						<div className="inline-breadcrumbs hidden-xs">
							<span className="breadcrumbs-list">
								<span className="breadcrumb-item">
									<Link to="/" aria-label="صفحه اصلی">
										<img src={HomeImage} className="icon-20" alt="خانه" />
									</Link>
								</span>
								{categories?.map((parent) => (
									<span key={parent.uid}>
										<span className="breadcrumb-separator">\</span>
										<span className="breadcrumb-item">
											<Link to={'/zekr-list/' + parent.uid} key={parent.uid}>
												{/* {category.icon && <i className={'fa ' + category.icon}></i>} zekr-benefits-dialog*/}
												<CategoryListSmallIcon category={parent} />
												{parent.title}
											</Link>
										</span>
									</span>
								))}
							</span>
						</div>
						<h1 className="inline-title">{zekr.fullName}</h1>
						<div className="inline-actions">
							{zekr.benefits && zekr.benefits?.length > 0 && (
								<button
									onClick={openZekrBenefits}
									type="button"
									title="فضیلت"
									className="button-simple mx-2"
									data-bs-toggle="modal"
									data-bs-target="#zekr-benefits-dialog"
								>
									<img src={IslamStarImage} className="icon-20" alt="" />
									<span className="hidden-xs-inline">&nbsp; فضیلت</span>
								</button>
							)}
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
							{categories?.map((parent) => (
								<span key={parent.uid}>
									<span className="breadcrumb-separator">\</span>
									<span className="breadcrumb-item">
										<Link to={'/zekr-list/' + parent.uid} key={parent.uid}>
											{/* {category.icon && <i className={'fa ' + category.icon}></i>} */}
											<CategoryListSmallIcon category={parent} />
											{parent.title}
										</Link>
									</span>
								</span>
							))}
						</span>
					</div>
					<div className="mb-4"></div>
				</div>
			</div>

			<div className="zekr-body-container">
				{zekr.zekrBody.map((body, index) => (
					<ZekrBodyText settings={settings} key={index} body={body} />
				))}
			</div>
			{zekr.source &&
				zekr.source.length > 0 &&
				zekr.source.map((src, index) => (
					<div className="zekr-source" key={index}>
						منبع:&nbsp;
						<a href={src.url} target="_blank" rel="noopener noreferrer nofollow">
							{src.title}
						</a>
					</div>
				))}
			<div className="zekr-body-play-buttons">
				{voicePlayerOpen && <ZekrVoicePlayer zekr={zekr} settings={settings} />}
				<ScrollTop />
				<TextZoomButtons />
				{zekr.zekrVoices && zekr.zekrVoices.length > 0 && (
					<Fragment>
						{voicePlayerOpen && (
							<a href="#stop" onClick={onVoicePlayerClose}>
								<img src="/assets/icons/stop.svg" className="icon-28 link-image" alt="⏹" />
							</a>
						)}
						{!voicePlayerOpen && (
							<a href="#play" onClick={onVoicePlayerOpen}>
								<img src="/assets/icons/play-button.svg" className="icon-28 link-image" alt="▶" />
							</a>
						)}
					</Fragment>
				)}
				<BookmarkZekrButton zekr={zekr} />
				{showZekrCounter && (
					<a href="#zekr-counter" onClick={onShowZekrCounter} title="ذکر شمار">
						<img src={TasbihImage} alt="." className="icon-24 link-image" />
					</a>
				)}
			</div>
			{zekr.benefits && zekr.benefits.length > 0 && zekrBenefitsDialog()}
			{zekrCounterVisible && showZekrCounter && (
				<ZekrInlineCounter zekrCounts={zekr.zekrCounts} onCloseRequested={onCloseZekrCounter} />
			)}
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
export default connect(mapStateToProps, mapDispatchToProps)(ZekrPage);
