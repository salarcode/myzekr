/**
 * Detects and add `position-sticky` class to the element.
 * IMPORTANT: top or bottom should be -1px
 * @param elementSelector
 * @returns
 */
export function detectPositionSticky(elementSelector: string) {
	const stickyElm = document.querySelector(elementSelector);
	if (!stickyElm) return;

	const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('position-sticky', e.intersectionRatio < 1), {
		threshold: [1],
	});
	observer.observe(stickyElm);
}
