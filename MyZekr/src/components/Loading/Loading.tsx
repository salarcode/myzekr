import './Loading.scss';
import { FC } from 'react';
import React from 'react';

export const Loading: FC = () => {
	return (
		<div className="loading">
			<div className="loading-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div>در حال بارگذاری...</div>
		</div>
	);
};
