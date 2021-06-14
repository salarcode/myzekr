import { Zekr } from './Zekr/models/Zekr';

export function getZekrUrl(zekr: Zekr | string): string {
	if (typeof zekr == 'string') {
		return '/zekr/' + zekr;
	} else {
		return '/zekr/' + zekr.uid;
	}
}
