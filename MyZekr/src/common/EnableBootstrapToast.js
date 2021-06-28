export function enableBootstrapToast(id) {
	var bootstrap = window['bootstrap'];

	var toastEl = document.getElementById(id);
	var toast = new bootstrap.Toast(toastEl, {});
	toast.show();
	return toast;
}
export function enableBootstrapToastAll() {
	var bootstrap = window['bootstrap'];

	var toastElList = [].slice.call(document.querySelectorAll('.toast'));
	var toastList = toastElList.map(function (toastEl) {
		// showing the toast
		return new bootstrap.Toast(toastEl, {});
	});
	return toastList;
}
