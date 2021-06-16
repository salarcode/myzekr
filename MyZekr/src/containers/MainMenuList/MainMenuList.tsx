import React, { FC } from 'react';
import './MainMenuList.scss';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';

export const MainMenuList: FC = () => {
	return (
		<menu className="mainmenu-list">
			<div>
				<Link to="/" aria-label="صفحه اصلی">
					<img src={homeIcon} alt="صفحه اصلی" />
				</Link>
			</div>
		</menu>
	);
};
