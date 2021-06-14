import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { retrieveStorageItem, saveStorageItem } from '../../services/Storage';

interface Props {
	returnUrl?: string;
	doNotShowButton?: boolean;
}

export const BackButton: FC<Props> = ({ returnUrl, doNotShowButton }) => {
	// always saving current state
	pushHistory(window.location.href);

	// just record history?
	if (doNotShowButton === true) return null;

	var backHistory = readHistory();

	var url = returnUrl;
	if (!url) {
		if (backHistory && backHistory.previous) {
			if (isUrlFromMe(backHistory.previous)) {
				url = backHistory.previous;
			}
		}
		if (!url && isReferredFromMe()) {
			url = document.referrer;
		}
	}
	//DEBUG: console.log('BackButton', backHistory, url);
	if (!url) {
		// do not display the button
		return null;
	}
	if (url == window.location.href) return null;

	url = removeMyOrigin(url);

	return (
		<Link title="بازگشت" to={url} key={url} className="px-1">
			<img alt="بازگشت" src="/assets/icons/back.svg" className="icon-20 link-image" />
		</Link>
	);
};

function pushHistory(url: string) {
	var h = readHistory();
	if (!h) {
		h = { current: url, previous: '' };
	} else {
		// don't override current if they're are same
		if (url == h.current) return;
		h = {
			previous: h.current,
			current: url,
		};
	}
	saveStorageItem('BackButton-History', h);
}
function readHistory() {
	return retrieveStorageItem<{ current: string; previous: string }>('BackButton-History');
}

function isReferredFromMe() {
	return isUrlFromMe(document.referrer);
}
function isUrlFromMe(url: string) {
	try {
		const referrer = new URL(url);
		return referrer.origin === window.location.origin;
	} catch (invalid_url_error) {
		return false;
	}
}
function removeMyOrigin(url: string) {
	try {
		const referrer = new URL(url);
		if (referrer.origin === window.location.origin) {
			var index = url.indexOf(referrer.origin);
			return url.substring(index + referrer.origin.length, url.length - index);
		} else {
			return url;
		}
	} catch (invalid_url_error) {
		return url;
	}
}
