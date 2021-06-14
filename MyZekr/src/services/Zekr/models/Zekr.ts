import { Uid } from './Uid';
import { ZekrBody } from './ZekrBody';
import { ZekrCounter } from './ZekrCounter';
import { ZekrReferenceSource } from './ZekrReferenceSource';
import { ZekrTime } from './ZekrTime';

interface ZekrBase {
	uid: string;
	shortName: string;
	fullName: string;
	imageUrl?: string;
	imageClass?: string;
	category: Uid;
	parents?: Uid[];
	tags?: Uid[];
	zekrTimes?: ZekrTime[];
	zekrCounter?: ZekrCounter[];
}

export interface ZekrIndex extends ZekrBase {}

export interface Zekr extends ZekrBase {
	zekrBody: ZekrBody[];
	benefits?: ZekrBody[];
	source?: ZekrReferenceSource[];
}

export interface ZekrMemory extends Zekr {}
