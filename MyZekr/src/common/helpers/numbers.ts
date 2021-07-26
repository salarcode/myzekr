export function toPersianNumber(num: number): string {
	return num.toLocaleString('fa', { useGrouping: false });
}
