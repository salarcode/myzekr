import { ZekrCategory } from './models/ZekrCategory';

export const ZekrCategoryAfterNamaz: ZekrCategory = {
	uid: 'after-salah',
	title: 'تعقیبات نماز',
	imageUrl: 'namaz.svg',
};

export const ZekrCategoryNamaz: ZekrCategory = {
	uid: 'salah',
	title: 'نماز',
	imageUrl: 'namaz.svg',
	children: [ZekrCategoryAfterNamaz.uid],
};

export const ZekrParentCategories: ZekrCategory[] = [ZekrCategoryNamaz];
export const ZekrAllCategories: ZekrCategory[] = [
	ZekrCategoryAfterNamaz,
	ZekrCategoryNamaz,
];

export function getZekrCategoryMemoryParentByParentUid(
	uid: string,
): ZekrCategory[] | undefined {
	let children = ZekrAllCategories.find((c) => c.uid === uid)?.children;

	let childrenCats = ZekrAllCategories.filter(
		(c) => children?.includes(c.uid) === true,
	);
	return childrenCats;
}

export function getZekrCategoryMemoryByUid(
	uid: string,
): ZekrCategory | undefined {
	return ZekrAllCategories.find((c) => c.uid === uid);
}
