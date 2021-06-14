import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SiteSearch } from '../SiteSearch/SiteSearch';
import './Header.scss';

export const Header: FC = () => {
	return (
		<div className="site-header">
			<button
				className="button button-subtle header-icon-button"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#sidebar-app-drawer"
			>
				<i className="fas fa-bars"></i>
			</button>
			<Link to="/" className="page-title">
				مرجع دعاها و اذکار
			</Link>
			<button
				className="button button-subtle header-icon-button"
				type="button"
				data-bs-toggle="modal"
				data-bs-target="#site-search-modal"
			>
				<i className="fas fa-search"></i>
			</button>
			<SiteSearch modalId="site-search-modal" />
		</div>
	);
};
