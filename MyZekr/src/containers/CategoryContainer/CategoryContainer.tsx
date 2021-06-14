import React, { FC, useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import { getZekrParentCategoryList } from '../../services/Zekr/ZekrService';
import { CategoryList } from '../CategoryList/CategoryList';

export const CategoryContainer: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [categories, setCategories] = useState<ZekrCategory[]>([]);

	useEffect(() => {
		async function doGet() {
			setLoading(true);
			let data = await getZekrParentCategoryList().catch((err) => {
				console.warn('Failed to read CategoryList', err);
			});
			if (data) {
				setCategories(data);
			}

			setLoading(false);
		}
		doGet();
	}, []);

	return loading ? <Loading /> : <CategoryList data={categories} />;
};
