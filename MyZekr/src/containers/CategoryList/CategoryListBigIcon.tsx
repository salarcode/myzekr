import './CategoryList.scss';
import { Fragment } from 'react';
import { FC } from 'react';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import StarImage from '../../assets-offline/icons/star.svg';

interface Props {
	category: ZekrCategory;
}

export const CategoryListBigIcon: FC<Props> = ({ category }) => {
	return (
		<Fragment>
			{category.iconClass ? (
				<i className={(category.iconClass || 'fa fa-search') + ' button-icon'} />
			) : category.imageUrl ? (
				<img className="icon-24 button-icon mx-1" src={'/assets/icons/' + category.imageUrl} alt="" />
			) : (
				<img className="icon-24 button-icon mx-1" src={StarImage} alt="" />
			)}
		</Fragment>
	);
};
