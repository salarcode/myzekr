import './ZekrCategoryPage.scss';
import React, { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { Loading } from '../../components/Loading/Loading';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import { ZekrCategory } from '../../services/Zekr/models/ZekrCategory';
import { getZekrByCategoryUid, getZekrCategoryByUid, getZekrCategoryChildrenByParentUid } from '../../services/Zekr/ZekrService';
import { CategoryList } from '../../containers/CategoryList/CategoryList';
import { BackButton } from '../../components/BackButton/BackButton';
import { CategoryListSmallIcon } from '../../containers/CategoryList/CategoryListSmallIcon';
import { ZekrListSearchable } from '../../containers/ZekrListSearchable/ZekrListSearchable';
import { PageMeta } from '../../containers/PageMeta/PageMeta';

interface params {
	categoryUid: string;
}
export const ZekrCategoryPage: FC<RouteComponentProps<params>> = ({ match, history }) => {
	const [zekrList, setZekrList] = useState<ZekrIndex[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [childrenCategories, setChildrenCategories] = useState<ZekrCategory[]>();
	const [category, setCategory] = useState<ZekrCategory>();
	const [catParents, setCatParents] = useState<ZekrCategory[]>([]);

	var categoryUid = match.params.categoryUid;

	useEffect(() => {
		async function doGetZekrList() {
			setLoading(true);
			let categoriesPromise = getZekrCategoryChildrenByParentUid(categoryUid).catch((err) => {
				console.warn('Failed to read parent categories for: ' + categoryUid, err);
			});
			let categoryPromise = getZekrCategoryByUid(categoryUid).catch((err) => {
				console.warn('Failed to read Category: ' + categoryUid, err);
			});

			let loadedZekrList = await getZekrByCategoryUid(categoryUid).catch((err) => {
				console.warn('Failed to read Zekr list for category:' + categoryUid, err);
			});
			let categories = await categoriesPromise;
			let category = await categoryPromise;

			let parents: ZekrCategory[] = [];

			if (category && category.parent?.length) {
				for (const parentUid of category.parent) {
					let parent = await getZekrCategoryByUid(parentUid).catch(() => {});
					if (parent) {
						parents.push(parent);
					}
				}
				setCatParents(parents);
			} else {
				setCatParents([]);
			}

			if (loadedZekrList) setZekrList(loadedZekrList);
			if (categories) setChildrenCategories(categories);
			if (category) setCategory(category);

			setLoading(false);
		}
		doGetZekrList();
	}, [categoryUid]);

	function categoryClick() {
		history.push('/zekr-list/' + category?.uid);
	}

	return loading || !zekrList ? (
		loading ? (
			<Loading />
		) : (
			<ErrorMessage retry={retryType.reloadPage} />
		)
	) : (
		<div>
			<PageMeta title={category?.title + ' - مشاهده دسته'} description={'مشاهده دسته - ' + category?.title} />
			<div className="sticky-inline-header">
				<div className="block-cell">
					<div className="page-inline-header">
						<div className="inline-breadcrumbs hidden-xs">
							{/* ---------- */}
							<span className="breadcrumbs-list">
								<span className="breadcrumb-item">
									<Link to="/">
										<img src="/assets/icons/home.svg" className="icon-20" />
									</Link>
								</span>
								{catParents?.map((parent) => (
									<span key={parent.uid}>
										<span className="breadcrumb-separator">\</span>
										<span className="breadcrumb-item">
											<Link to={'/zekr-list/' + parent.uid} key={parent.uid}>
												{/* {category.icon && <i className={'fa ' + category.icon}></i>} */}
												<CategoryListSmallIcon category={parent} />
												{parent.title}
											</Link>
										</span>
									</span>
								))}
							</span>
						</div>
						<h1 className="inline-title">
							{category && (
								<div>
									{/* {category.icon && <i className={'fa ' + category.icon}></i>} */}
									<Link to={'/zekr-list/' + category.uid} key={category.uid}>
										مشاهده دسته: {category.title}
									</Link>
								</div>
							)}
						</h1>
						<div className="inline-actions">
							<BackButton />
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="block-cell">
					<div className="out-breadcrumbs visible-xs">
						{/* ---------- */}
						<span className="breadcrumbs-list">
							<span className="breadcrumb-item">
								<Link to="/">
									<img src="/assets/icons/home.svg" className="icon-20" />
								</Link>
							</span>
							{catParents?.map((parent) => (
								<span key={parent.uid}>
									<span className="breadcrumb-separator">\</span>
									<span className="breadcrumb-item">
										<Link to={'/zekr-list/' + parent.uid} key={parent.uid}>
											{/* {category.icon && <i className={'fa ' + category.icon}></i>} */}
											<CategoryListSmallIcon category={parent} />
											{parent.title}
										</Link>
									</span>
								</span>
							))}
						</span>
					</div>
					<div className="mb-4"></div>
				</div>
			</div>
			{childrenCategories && (
				<section className="main-section">
					<h3 className="main-section-title">
						<span>⭐</span>
						زیر مجموعه ها
					</h3>
					<div className="">
						<CategoryList data={childrenCategories} />
					</div>
				</section>
			)}
			<ZekrListSearchable textBoxId="category-page-zekr" sectionTitle="⭐ دعاها" zekrList={zekrList} />
		</div>
	);
};
