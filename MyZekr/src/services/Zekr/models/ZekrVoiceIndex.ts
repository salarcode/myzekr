export interface ZekrVoiceIndex {
	zekrUid: string;
	voices: ZekrVoiceIndexItem[];
}
export interface ZekrVoiceIndexItem {
	uid: string;
	name: string;
	file: string;
	fileSize?: number;
}
