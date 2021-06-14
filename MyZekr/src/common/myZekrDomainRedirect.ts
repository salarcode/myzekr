import { HttpResponse, webJsonRequestXhr } from './webJsonRequestXhr';

const myZekrHostname = 'myzekr.com';

const isLocalhost = Boolean(
	window.location.hostname === 'slr-deskX' ||
		window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.0/8 are considered localhost for IPv4.
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);
export async function redirectToMyZekrCom(skipLocal: boolean = true) {
	setTimeout(() => {
		redirectToMyZekrCom_internal(skipLocal);
	}, 100);
}

async function redirectToMyZekrCom_internal(skipLocal: boolean = true) {
	var l = window.location;

	if (skipLocal && isLocalhost) return;

	if (l.hostname.toLowerCase() == myZekrHostname.toLowerCase()) {
		// host is same
		return;
	}
	// host is not same
	// check if MyZekr.com is responding!
	// if MyZekr.com is responding redirect to it

	var isMyZekrWorking = true;
	var response: HttpResponse<string> | null = null;
	debugger;
	try {
		response = await webJsonRequestXhr<undefined, string>({
			url: 'https://' + myZekrHostname,
			timeout: 10 * 1000,
		});
	} catch (err) {
		isMyZekrWorking = false;
	}
	if (isMyZekrWorking) {
		if (response && response.parsedBody && response.parsedBody.includes('myzekr-root')) {
			//
			isMyZekrWorking = true;
		} else {
			isMyZekrWorking = false;
		}
	}
	debugger;
	if (!isMyZekrWorking) {
		var newUrl = l.toString().replace(l.hostname, myZekrHostname);
		l.replace(newUrl);
	}
}
