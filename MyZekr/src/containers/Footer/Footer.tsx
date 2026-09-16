import React, { FC } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
	return (
		<footer className="main-footer">
			<Link to="/">تماس با ما</Link> | &nbsp;
			<Link to="/">درباره ما</Link> | &nbsp;
			<Link to="/">گزارش خطا</Link>
			<div>
				<span className="text-bold">©</span>
				1404 تمامی حقوقی مادی و معنوی
				<a href="//myzekr.com/"> MyZekr </a> محفوظ است
			</div>
		</footer>
	);
};
