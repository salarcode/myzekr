import './ErrorMessage.scss';
import { FC } from 'react';
import React from 'react';

export enum retryType {
	none,
	reloadPage,
	retryFunction,
}

interface Props {
	message?: string;
	retry?: retryType;
	retryFunction?: () => void;
}

export const ErrorMessage: FC<Props> = ({ message, retry, retryFunction }) => {
	if (!message) {
		if (navigator.onLine) {
			message = 'مشکلی در دریافت یا نمایش اطلاعات پیش آمده است';
		} else {
			message = 'لطفا اتصال اینترنت خود را بررسی کنید. مشکلی در دریافت یا نمایش اطلاعات پیش آمده است.';
		}
	}

	function onReloadPage() {
		window.location.reload();
	}
	function onRetryFunction() {
		if (retryFunction) retryFunction();
	}

	return (
		<div className="error-container alert alert-danger">
			<h6 className="text-center">{message}</h6>
			<br />
			{retry === retryType.reloadPage && (
				<button className="btn btn-sm btn-outline-danger retry" onClick={onReloadPage}>
					بازخوانی صفحه
				</button>
			)}
			{retry === retryType.retryFunction && (
				<button className="btn btn-sm btn-outline-danger retry" onClick={onRetryFunction}>
					تلاش مجدد
				</button>
			)}
		</div>
	);
};
