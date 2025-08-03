import { ZekrIndex } from './models/Zekr';
import { getZekrIndexList, getWebZekrCategoryList } from './ZekrWebService';

/**
 * Get random recommendations based on categories
 * @param count Number of recommendations to return
 */
export async function getRandomRecommendations(count: number = 5): Promise<ZekrIndex[]> {
	try {
		const zekrList = await getZekrIndexList();
		const categoryList = await getWebZekrCategoryList();

		if (!zekrList || !categoryList) {
			return [];
		}

		// Get random categories
		const randomCategories = getRandomItems(categoryList, 3).map((cat) => cat.uid);

		// Filter zekr based on random categories
		const filteredZekr = zekrList.filter((zekr) => randomCategories.includes(zekr.category));

		// Return random selection from filtered results
		return getRandomItems(filteredZekr, count);
	} catch (error) {
		console.error('Error getting recommendations:', error);
		return [];
	}
}

/**
 * Get recommendations based on a specific category
 * @param categoryUid Category UID to base recommendations on
 * @param count Number of recommendations to return
 */
export async function getRecommendationsByCategory(categoryUid: string, count: number = 5): Promise<ZekrIndex[]> {
	try {
		const zekrList = await getZekrIndexList();
		if (!zekrList) return [];

		const filteredZekr = zekrList.filter((zekr) => zekr.category === categoryUid);

		return getRandomItems(filteredZekr, count);
	} catch (error) {
		console.error('Error getting recommendations by category:', error);
		return [];
	}
}

/**
 * Get random items from an array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
	const shuffled = [...array].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, Math.min(count, array.length));
}
