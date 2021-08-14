import './ZekrCounterComponent.scss';
import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';
import { ZekrCounter } from '../../services/Zekr/models/ZekrCounter';
import { toPersianNumber } from '../../common/helpers/numbers';
import { getNewUid } from '../../common/helpers/uid';

interface Props {
	zekrCounts?: ZekrCounter[];
	onCloseRequested?: () => void;
}

interface CountsDetail extends ZekrCounter {
	id: string;
	passed?: number;
}

var zekrClickStatus = false;
var zekrVibrateWarmed = false;

export const ZekrCounterComponent: FC<Props> = ({ zekrCounts, onCloseRequested }) => {
	let [count, setCount] = useState<number>(0);
	const [countHistory, setCountHistory] = useState<number[]>([]);
	const [activeCountsDetail, setActiveCountsDetail] = useState<CountsDetail | undefined>(undefined);
	const [zekrCountsDetails, setZekrCountsDetails] = useState<CountsDetail[]>([]);

	useEffect(() => {
		if (zekrCounts) {
			var arr = [];
			for (const c of zekrCounts) {
				arr.push({
					count: c.count,
					name: c.name,
					passed: 0,
					id: getNewUid(),
				});
			}
			setZekrCountsDetails(arr);
		}
	}, [zekrCounts]);

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
		var batchStatus = increaseCountBatch();

		setCount(count + 1);
		count += 1;

		if (batchStatus.resetCount) {
			debugger;
			resetCount(true);
		}
		if (!batchStatus.isVibrated) {
			vibrateShort();
		}
	}
	function decreaseCount() {
		decreaseCountBatch();
		setCount(count - 1);
		count -= 1;

		vibrateLong();
	}

	function resetCount(dontVibrate?: boolean) {
		if (count) countHistory.push(count);
		resetCountBatch();
		setCount(0);
		count = 0;

		if (dontVibrate !== true) {
			vibrateLong();
		}
	}

	function increaseCountBatch(): {
		isVibrated: boolean;
		resetCount: boolean;
	} {
		if (!activeCountsDetail)
			return {
				isVibrated: false,
				resetCount: false,
			};
		if (activeCountsDetail.passed) {
			activeCountsDetail.passed++;
		} else {
			activeCountsDetail.passed = 1;
		}

		if (activeCountsDetail.passed >= activeCountsDetail.count) {
			selectNextCountDetails();

			vibrateLonger();
			return {
				isVibrated: true,
				resetCount: true,
			};
		}
		return {
			isVibrated: false,
			resetCount: false,
		};
	}
	function decreaseCountBatch() {
		if (!activeCountsDetail) return;
		if (activeCountsDetail.passed) {
			activeCountsDetail.passed--;

			if (activeCountsDetail.passed <= 0) {
				activeCountsDetail.passed = undefined;
			}
		}
	}
	function resetCountBatch() {
		if (!activeCountsDetail) return;
		activeCountsDetail.passed = undefined;
	}

	function selectNextCountDetails() {
		if (!activeCountsDetail) return;
		debugger;
		let foundIndex = -1;
		for (let index = 0; index < zekrCountsDetails.length; index++) {
			const c = zekrCountsDetails[index];
			if (c.id == activeCountsDetail.id) {
				foundIndex = index;
				break;
			}
		}
		if (foundIndex >= 0) {
			if (foundIndex + 1 > zekrCountsDetails.length) {
				setActiveCountsDetail(undefined);
			} else {
				setActiveCountsDetail(zekrCountsDetails[foundIndex + 1]);
			}
		} else {
			setActiveCountsDetail(undefined);
		}
	}

	function clearHistory() {
		setCountHistory([]);
		vibrateLong();
	}

	function vibrateShort() {
		if ('vibrate' in navigator) {
			navigator.vibrate(60);
		}
	}
	function vibrateLong() {
		if ('vibrate' in navigator) {
			navigator.vibrate(200);
		}
	}
	function vibrateLonger() {
		if ('vibrate' in navigator) {
			navigator.vibrate(350);
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

	function onClickCounts(e: React.MouseEvent, counterDetail?: CountsDetail) {
		if (counterDetail) {
			counterDetail.passed = undefined;
		}
		setActiveCountsDetail(counterDetail);
	}

	return (
		<div className="zekr-counter-box">
			<div className="count">شمارش: {toPersianNumber(count ? count : 0)}</div>
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
			{zekrCountsDetails.length > 0 && (
				<div className="zekr-defined-counts mb-2">
					<div
						className={'badge border-1 rounded-pill text-secondary ' + (activeCountsDetail == null ? 'active' : '')}
						onClick={(e) => onClickCounts(e, undefined)}
					>
						شمارشگر: بدون دسته
					</div>
					{zekrCountsDetails?.map((counter, i) => (
						<div
							key={counter.id}
							className={
								'badge border-1 border-primary rounded-pill bg-lightX text-secondary ' +
								(counter.id === activeCountsDetail?.id ? 'active' : '')
							}
							onClick={(e) => onClickCounts(e, counter)}
						>
							<strong className="text-black">
								{counter.passed
									? toPersianNumber(counter.passed) + '/' + toPersianNumber(counter.count)
									: toPersianNumber(counter.count)}
							</strong>{' '}
							{counter.name}
						</div>
					))}
				</div>
			)}
			<div>
				<button className="button-outlined" onClick={decreaseCount}>
					کاهش
				</button>
				&nbsp;
				<button className="button-outlined" onClick={() => resetCount()}>
					از ابتدا
				</button>
			</div>
			<div className="history mb-2">
				{countHistory?.length > 0 && (
					<div>
						{countHistory?.map((c, i) => <div key={i}>شمارش: {toPersianNumber(c)}</div>).reverse()}
						<button className="button-outlined mt-2" onClick={clearHistory}>
							حذف تاریخچه
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
