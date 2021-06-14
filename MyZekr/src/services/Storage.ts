import { retrieveCacheItem, saveCacheItem } from './MemoryCache';

/**
 * Cache + Browser local storage
 * @param key item key
 */
export function saveStorageItem<T>(key: string, value: T) {
	saveCacheItem(key, value);
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Cache + Browser local storage
 * @param key item key
 */
export function retrieveStorageItem<T>(key: string): T | undefined {
	var value = retrieveCacheItem<T>(key);
	if (value) return value;

	// we will get here on app reload or returning user
	var item = localStorage.getItem(key);
	if (item) {
		value = JSON.parse(item) as T;

		// save in memory cache
		saveCacheItem(key, value);
		return value;
	}
	return undefined;
}
