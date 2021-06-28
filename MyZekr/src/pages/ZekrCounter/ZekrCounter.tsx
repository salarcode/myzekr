import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import './ZekrCounter.scss';
import HomeImage from '../../assets-offline/icons/home.svg';
//import TheIndex from '../../assets-offline/category-index.json';

var zekrClickStatus = false;
var zekrVibrateWarmed = false;

export const ZekrCounter = () => {
	const [count, setCount] = useState<number>(0);
	const [countHistory, setCountHistory] = useState<number[]>([]);

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

	//console.log('the json index', TheIndex);

	return (
		<div className="zekr-counter-box">
			<PageMeta title="ذکر شمار" description="ذکر شمار" />
			<div className="sticky-inline-header-DISABLED">
				<div className="block-cell">
					<div className="page-inline-header">
						<div className="inline-breadcrumbs hidden-xs">
							<span className="breadcrumbs-list">
								<span className="breadcrumb-item">
									<Link to="/" aria-label="صفحه اصلی">
										<img src={HomeImage} className="icon-20" alt="خانه" />
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
