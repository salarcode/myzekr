import { Uid } from './Uid';
import { ZekrBody } from './ZekrBody';
import { ZekrCounter } from './ZekrCounter';
import { ZekrReferenceSource } from './ZekrReferenceSource';
import { ZekrTime } from './ZekrTime';

interface ZekrBase {
	uid: string;
	fullName: string;
	metaTitle: string;
	metaDescription: string;
	imageUrl?: string;
	imageClass?: string;
	category: Uid;
	parents?: Uid[];
	tags?: Uid[];
	zekrTimes?: ZekrTime[];
	zekrCounts?: ZekrCounter[];
	showZekrCounter?: boolean;
}

export interface ZekrIndex extends ZekrBase {}

export interface Zekr extends ZekrBase {
	zekrBody: ZekrBody[];
	benefits?: ZekrBody[];
	source?: ZekrReferenceSource[];
}

export interface ZekrMemory extends Zekr {}
