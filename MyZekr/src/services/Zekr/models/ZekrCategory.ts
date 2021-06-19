import { Uid } from './Uid';

export interface ZekrCategory {
	uid: string;
	title: string;
	iconClass?: string;
	imageUrl?: string;
	description?: string;

	/** Children category UID */
	children?: Uid[];

	parent?: Uid[];
}
