import './CategoryList.scss';
import React, { Fragment } from 'react';
import { FC } from 'react';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';

interface Props {
	category: ZekrCategory;
}

export const CategoryListSmallIcon: FC<Props> = ({ category }) => {
	return (
		<Fragment>
			{category.iconClass ? (
				<i className={(category.iconClass || 'fa fa-search') + ' button-icon'} />
			) : category.imageUrl ? (
				<img className="icon-16 button-icon mx-1" src={'/assets/icons/' + category.imageUrl} alt={category.title} />
			) : (
				<img className="icon-16 button-icon mx-1" src="/assets/icons/star.svg" alt={category.title} />
			)}
		</Fragment>
	);
};
