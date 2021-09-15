import { defaultWebRequestTimeout, webJsonRequestXhr } from '../../common/webJsonRequestXhr';
import { retrieveCacheItem, saveCacheItem } from '../MemoryCache';
import { Uid } from './models/Uid';
import { Zekr, ZekrIndex } from './models/Zekr';
import { ZekrCategory } from './models/ZekrCategory';
import { ZekrVoiceIndex } from './models/ZekrVoiceIndex';

/** The base url for Json data could be any CDN */
const siteBaseUrl = '';

/**
 * Get Zekr data by its UID. [Not cached]
 * @param uid Zekr UID
 */
export function getWebZekrByUid(uid: string): Promise<Zekr | undefined> {
	if (!uid) return Promise.resolve(undefined);
	uid = uid.toLowerCase();

	let url = `${siteBaseUrl}/zekr-db/zekr/${uid}.json`;
	return new Promise((resolve, reject) => {
		webJsonRequestXhr<undefined, Zekr>({
			url: url,
			timeout: defaultWebRequestTimeout,
		})
			.then((response) => {
				var value = response.parsedBody;
				resolve(value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/**
 * Get ZekrIndex list by their category UID. [cached]
 * @param uid Category UID
 */
export async function getWebZekrByCategoryUi(uid: string): Promise<ZekrIndex[] | undefined> {
	if (!uid) return Promise.resolve(undefined);
	uid = uid.toLowerCase();

	return new Promise((resolve, reject) => {
		getZekrIndexList()
			.then((categories) => {
				let values = categories?.filter((c) => c.category === uid);
				resolve(values);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/**
 * List of categories. [cached]
 */
export function getWebZekrCategoryList(): Promise<ZekrCategory[] | undefined> {
	return new Promise((resolve, reject) => {
		_getCategoryIndexList()
			.then((categories) => {
				let values = categories?.filter((c) => !c.parent || !c.parent.length);
				resolve(values);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
/**
 * Get ZekrCategory by its UID. [cached]
 * @param uid Category UID
 */
export function getWebZekrCategoryByUid(uid: Uid): Promise<ZekrCategory | undefined> {
	if (!uid) return Promise.resolve(undefined);
	uid = uid.toLowerCase();

	return new Promise((resolve, reject) => {
		_getCategoryIndexList()
			.then((categories) => {
				let value = categories?.find((c) => c.uid === uid);
				resolve(value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
/**
 * Get ZekrCategory by its UID and then its parents. [cached]
 * @param uid Category UID
 */
export function getWebZekrCategoryChainToTopByUid(uid: Uid): Promise<ZekrCategory[] | undefined> {
	if (!uid) return Promise.resolve(undefined);
	uid = uid.toLowerCase();

	return new Promise((resolve, reject) => {
		_getCategoryIndexList()
			.then((categories) => {
				if (!categories) {
					resolve(undefined);
					return;
				}
				let cat = categories.find((c) => c.uid === uid);
				if (!cat) {
					resolve(undefined);
					return;
				}
				let result: ZekrCategory[] = [cat];

				// getting the top level parents
				if (cat.parent && cat.parent.length > 0) {
					let parentUid: string | undefined = cat.parent[0];
					while (parentUid) {
						let parent = categories.find((c) => c.uid === parentUid);
						parentUid = undefined;

						if (parent) {
							result.push(parent);

							// the next level parent?
							if (parent.parent && parent.parent.length > 0) {
								parentUid = parent.parent[0];
							}
						}
					}
				}

				resolve(result.reverse());
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getWebZekrCategoryChildrenByParentUid(parentUid: string): Promise<ZekrCategory[] | undefined> {
	if (!parentUid) return Promise.resolve(undefined);
	parentUid = parentUid.toLowerCase();

	return new Promise((resolve, reject) => {
		_getCategoryIndexList()
			.then((categories) => {
				if (!categories) {
					resolve(undefined);
					return;
				}

				let children = categories.find((c) => c.uid === parentUid)?.children;
				if (children) {
					let childrenCats = categories.filter((c) => children?.includes(c.uid) === true);
					resolve(childrenCats);
				} else {
					resolve(undefined);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function _getCategoryIndexList(): Promise<ZekrCategory[] | undefined> {
	let keyName = `category-index`;
	let cachedItem = retrieveCacheItem<ZekrCategory[]>(keyName);
	if (cachedItem) {
		// retrieved from cache
		return Promise.resolve(cachedItem);
	}

	let url = `${siteBaseUrl}/zekr-db/${keyName}.json`;
	return new Promise((resolve, reject) => {
		webJsonRequestXhr<undefined, ZekrCategory[]>({
			url: url,
			timeout: defaultWebRequestTimeout,
		})
			.then((response) => {
				var value = response.parsedBody;
				if (value) {
					saveCacheItem(keyName, value);
				}
				resolve(value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getZekrIndexList(): Promise<ZekrIndex[] | undefined> {
	let keyName = `zekr-index`;
	let cachedItem = retrieveCacheItem<ZekrIndex[]>(keyName);
	if (cachedItem) {
		// retrieved from cache
		return Promise.resolve(cachedItem);
	}

	let url = `${siteBaseUrl}/zekr-db/${keyName}.json`;
	return new Promise((resolve, reject) => {
		webJsonRequestXhr<undefined, ZekrIndex[]>({
			url: url,
			timeout: defaultWebRequestTimeout,
		})
			.then((response) => {
				var value = response.parsedBody;
				if (value) {
					saveCacheItem(keyName, value);
				}
				resolve(value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getZekrVoiceIndexList(): Promise<ZekrVoiceIndex[] | undefined> {
	let keyName = `zekr-voice-index`;
	let cachedItem = retrieveCacheItem<ZekrVoiceIndex[]>(keyName);
	if (cachedItem) {
		// retrieved from cache
		return Promise.resolve(cachedItem);
	}

	let url = `${siteBaseUrl}/zekr-db/${keyName}.json`;
	return new Promise((resolve, reject) => {
		webJsonRequestXhr<undefined, ZekrVoiceIndex[]>({
			url: url,
			timeout: defaultWebRequestTimeout,
		})
			.then((response) => {
				var value = response.parsedBody;
				if (value) {
					saveCacheItem(keyName, value);
				}
				resolve(value);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
