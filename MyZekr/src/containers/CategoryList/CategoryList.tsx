import './CategoryList.scss';
import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import { CategoryListBigIcon } from './CategoryListBigIcon';

interface Props {
	data: ZekrCategory[];
}

export const CategoryList: FC<Props> = ({ data }) => {
	return (
		<div className="category-list">
			{data.map((category) => (
				<Link className="category-button" to={'/zekr-list/' + category.uid} key={category.uid}>
					<CategoryListBigIcon category={category} />
					<div className="button-text">{category.title}</div>
				</Link>
			))}
		</div>
	);
};
