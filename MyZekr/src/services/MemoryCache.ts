const CacheHolder: any = {};

export function saveCacheItem<T>(key: string, value: T) {
	CacheHolder[key] = value;
}

// retrieve
export function retrieveCacheItem<T>(key: string): T | undefined {
	return CacheHolder[key] as T;
}
