import React, { FC } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

class Clock extends React.Component {
	render() {
		return <h1>Look at the time: {new Date()}</h1>;
	}
}

export const Footer: FC = () => {
	return (
		<footer className="main-footer">
			{/* <Link to=".">تعرفه های آگهی</Link> | &nbsp;
			<Link to=".">تماس با ما</Link> | &nbsp;
			<Link to=".">درباره ما</Link> */}
			<Link to="/">تماس با ما</Link> | &nbsp;
			<Link to="/">درباره ما</Link> | &nbsp;
			<Link to="/">گزارش خطا</Link>
			<div>
				<span className="text-bold">©</span>
				1400 تمامی حقوقی مادی و معنوی
				<a href="//myzekr.com/"> MyZekr </a> محفوظ است
			</div>
		</footer>
	);
};
