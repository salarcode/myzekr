import './CategoryList.scss';
import { Fragment } from 'react';
import { FC } from 'react';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import StarImage from '../../assets-offline/icons/star.svg';

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
				<img className="icon-16 button-icon mx-1" src={StarImage} alt={category.title} />
			)}
		</Fragment>
	);
};
