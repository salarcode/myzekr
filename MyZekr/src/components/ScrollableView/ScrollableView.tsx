import React, { FC, useEffect } from 'react';
import { Zekr } from '../../services/Zekr/models/Zekr';
import './ScrollableView.scss';
import jQuery from 'jquery';

interface Props {
	zekr: Zekr;
}

export const ScrollableView: FC = ({ children }) => {
	useEffect(() => {
		resizeScrollableView();

		// Specify how to clean up after this effect:
		return function () {
			window.removeEventListener('resize', resizeScrollableView);
		};
	}, []);
	window.addEventListener('resize', resizeScrollableView);

	let resizeTimeout: any;
	function resizeScrollableView() {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}

		resizeTimeout = setTimeout(() => {
			resizeToContent('.scrollable-to-view', '.main-footer', 12);

			// resize again once
			resizeScrollableView();
		}, 100);
	}
	function resizeToContent(
		selectorText: string,
		bottomElementsSelector?: string,
		clearanceHeight?: number,
	) {
		let element = jQuery(selectorText);
		element.css('height', 0);

		let height = jQuery(document).height() || 0;
		let position = element.position();
		if (position && position.top) height -= position.top;

		if (bottomElementsSelector) {
			let bottom = jQuery(bottomElementsSelector);
			height -= bottom.outerHeight() || 0;
		}
		if (clearanceHeight) {
			height -= clearanceHeight;
		}
		element.css('height', height);
	}
	resizeScrollableView();

	return <div className="scrollable-to-view">{children}</div>;
};
