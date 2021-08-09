import './ZekrInlineCounter.scss';
import { FC } from 'react';
import { ZekrCounter } from '../../services/Zekr/models/ZekrCounter';
import { ZekrCounterComponent } from '../../components/ZekrCounter/ZekrCounterComponent';

interface Props {
	zekrCounts?: ZekrCounter[];
	onCloseRequested?: () => void;
}

export const ZekrInlineCounter: FC<Props> = ({ zekrCounts, onCloseRequested }) => {
	return (
		<div className="zekr-counter-inline">
			<ZekrCounterComponent zekrCounts={zekrCounts} onCloseRequested={onCloseRequested} />
		</div>
	);
};
