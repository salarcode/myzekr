import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SiteSearch } from '../SiteSearch/SiteSearch';
import './Header.scss';

export const Header: FC = () => {
	return (
		<div className="site-header">
			<button
				className="button-simple button-subtle header-icon-button"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#sidebar-app-drawer"
				aria-label="منو"
			>
				<i className="fas fa-bars"></i>
			</button>
			<Link to="/" aria-label="صفحه اصلی">
				<h2 className="page-title">دعاها و اذکار</h2>
			</Link>
			<button
				className="button-simple button-subtle header-icon-button"
				type="button"
				data-bs-toggle="modal"
				data-bs-target="#site-search-modal"
				aria-label="جستجو"
			>
				<i className="fas fa-search"></i>
			</button>
			<SiteSearch modalId="site-search-modal" />
		</div>
	);
};
