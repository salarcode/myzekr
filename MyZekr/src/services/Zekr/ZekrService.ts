import { Zekr, ZekrIndex } from './models/Zekr';
import { ZekrCategory } from './models/ZekrCategory';
import {
	getWebZekrByCategoryUi,
	getWebZekrByUid,
	getWebZekrCategoryByUid,
	getWebZekrCategoryChainToTopByUid,
	getWebZekrCategoryChildrenByParentUid,
	getWebZekrCategoryList as getWebZekrParentCategoryList,
} from './ZekrWebService';

export function getZekrVoiceFileUrl(filename: string): string {
	return `/zekr-db/zekr-voice/${filename}`;
}

export function getZekrByUid(uid: string): Promise<Zekr | undefined> {
	return getWebZekrByUid(uid);
}

export function getZekrParentCategoryList(): Promise<ZekrCategory[] | undefined> {
	return getWebZekrParentCategoryList();
}

export function getZekrByCategoryUid(uid: string): Promise<ZekrIndex[] | undefined> {
	return getWebZekrByCategoryUi(uid);
}

export function getZekrCategoryByUid(uid: string): Promise<ZekrCategory | undefined> {
	return getWebZekrCategoryByUid(uid);
}
export function getZekrCategoryChainToTopByUid(uid: string): Promise<ZekrCategory[] | undefined> {
	return getWebZekrCategoryChainToTopByUid(uid);
}

export function getZekrCategoryChildrenByParentUid(parentUid: string): Promise<ZekrCategory[] | undefined> {
	return getWebZekrCategoryChildrenByParentUid(parentUid);
}

// export function getUserFavorites(){

// }
