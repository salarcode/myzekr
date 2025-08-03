import { FC, useEffect, useState } from 'react';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import { getRandomRecommendations } from '../../services/Zekr/ZekrRecommendationService';
import { ZekrListSummary } from '../../containers/ZekrListSummary/ZekrListSummary';
import './ZekrRecommendations.scss';

interface Props {
	title?: string;
	count?: number;
}

export const ZekrRecommendations: FC<Props> = ({ title = 'پیشنهادات برای شما', count = 5 }) => {
	const [recommendations, setRecommendations] = useState<ZekrIndex[]>([]);
	const [loading, setLoading] = useState(true);

	const loadRecommendations = async () => {
		try {
			setLoading(true);
			const data = await getRandomRecommendations(count);
			setRecommendations(data);
		} catch (error) {
			console.error('Error loading recommendations:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRecommendations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	const refreshRecommendations = () => {
		loadRecommendations();
	};

	if (loading || recommendations.length === 0) {
		return <span />;
	}

	return (
		<section className="main-section zekr-recommendations">
			<div className="">
				<h3 className="main-section-title title-with-tools">
					{title}
					<button className="button-simple refresh-btn" onClick={refreshRecommendations} title="بروزرسانی پیشنهادات">
						<i className="fas fa-sync-alt"></i>
					</button>
				</h3>
			</div>
			<div className="recommendations-contentXX">
				<ZekrListSummary data={recommendations} />
			</div>
		</section>
	);
};
