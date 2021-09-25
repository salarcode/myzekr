import { ZekrIndex } from './models/Zekr';

export function searchZekrIndex(zekrIndexList: ZekrIndex[], searchText: string, limit: number): ZekrIndex[] {
	var result: ZekrIndex[] = [];
	var remaining = limit;

	for (const zekr of zekrIndexList) {
		if (zekr.fullName?.includes(searchText) || zekr.metaTitle?.includes(searchText)) {
			result.push(zekr);
		}
		remaining--;
		if (remaining <= 0) break;
	}
	return result;
}
