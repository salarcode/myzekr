import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import { ZekrRecommendations } from '../../components/ZekrRecommendations/ZekrRecommendations';
import './ZekrCounter.scss';
import HomeImage from '../../assets-offline/icons/home.svg';
import { ZekrCounterComponent } from '../../components/ZekrCounter/ZekrCounterComponent';

export const ZekrCounter = () => {
	return (
		<div className="zekr-counter-page">
			<PageMeta
				title="ذکر شمار - شمارش ذکر و صلوات"
				description="شمارش ذکر و صلوات با افزایش و کاهنده شمارش. نمایش ذکر های قبلی."
			/>
			<div className="sticky-inline-header-DISABLED">
				<div className="block-cell">
					<div className="page-inline-header">
						<div className="inline-breadcrumbs hidden-xs">
							<span className="breadcrumbs-list">
								<span className="breadcrumb-item">
									<Link to="/" aria-label="صفحه اصلی">
										<img src={HomeImage} className="icon-20 mx-1" alt="خانه" />
										صفحه دعاها
									</Link>
								</span>
							</span>
						</div>
						<h1 className="inline-title">ذکر شمار</h1>
						<div className="inline-actions">
							<BackButton />
						</div>
					</div>
				</div>
			</div>

			<ZekrCounterComponent />

			<ZekrRecommendations title="پیشنهادات ذکر" count={4} />
		</div>
	);
};
