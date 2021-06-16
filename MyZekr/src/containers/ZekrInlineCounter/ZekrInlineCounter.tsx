import './ZekrInlineCounter.scss';

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';
import { ZekrCounter } from '../../services/Zekr/models/ZekrCounter';

interface Props {
	zekrCounts?: ZekrCounter[];
	onCloseRequested?: () => void;
}
var zekrClickStatus = false;
var zekrVibrateWarmed = false;

export const ZekrInlineCounter: FC<Props> = ({ zekrCounts, onCloseRequested }) => {
	const [count, setCount] = useState<number>(0);
	const [countHistory, setCountHistory] = useState<number[]>([]);

	function onCloseClick() {
		if (onCloseRequested) onCloseRequested();
	}

	function onTouchStart(e: any) {
		zekrClickStatus = true;
		increaseCount();
	}
	function onMouseDown(e: any) {
		if (zekrClickStatus) return;

		zekrClickStatus = true;
		increaseCount();
	}
	function onClick(e: any) {
		if (!zekrClickStatus) {
			increaseCount();
		}

		zekrClickStatus = false;
	}

	function increaseCount() {
		setCount(count + 1);
		vibrateShort();
	}
	function decreaseCount() {
		setCount(count - 1);
		vibrateLong();
	}

	function resetCount() {
		if (count) countHistory.push(count);
		setCount(0);
		vibrateLong();
	}

	function clearHistory() {
		setCountHistory([]);
		vibrateLong();
	}

	function vibrateShort() {
		navigator.vibrate(100);
		if ('vibrate' in navigator) {
			navigator.vibrate(60);
		}
	}
	function vibrateLong() {
		if ('vibrate' in navigator) {
			navigator.vibrate(200);
		}
	}

	function vibrateWarmup() {
		if (zekrVibrateWarmed) return;

		if ('vibrate' in navigator) {
			navigator.vibrate(1);
		}
		zekrVibrateWarmed = true;
	}
	vibrateWarmup();

	return (
		<div className="zekr-counter-box zekr-counter-inline">
			<div className="count mt-3">شمارش: {count ? count : '0'}</div>
			<button
				type="button"
				className="counter-button button-contained"
				onTouchStart={onTouchStart}
				onMouseDown={onMouseDown}
				onClick={onClick}
			>
				افزایش شمارنده
			</button>
			{onCloseRequested && <button onClick={onCloseClick} type="button" className="btn-close text-reset"></button>}
			<hr />
			<div>
				<button className="button-outlined" onClick={decreaseCount}>
					کاهش
				</button>
				&nbsp;
				<button className="button-outlined" onClick={resetCount}>
					از ابتدا
				</button>
			</div>
			<div className="history mb-2">
				{countHistory?.length > 0 && (
					<div>
						{countHistory?.map((c, i) => <div key={i}>شمارش: {c}</div>).reverse()}
						<button className="button-outlined mt-2" onClick={clearHistory}>
							حذف تاریخچه
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
