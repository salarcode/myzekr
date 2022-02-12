// This piece of code is taken from here and converted/updated to TS: https://stackoverflow.com/a/23230280/322446
export function enableOffCanvasSwipe(
	onSwipeRight: Function | null = null,
	onSwipeLeft: Function | null = null,
	onSwipeUp: Function | null = null,
	onSwipeDown: Function | null = null,
	swipeThreshold: number = 150,
) {
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown: number | null = null;
	var yDown: number | null = null;

	function getTouches(evt: any) {
		return (
			evt.touches || // browser API
			evt.originalEvent.touches
		); // jQuery
	}

	function handleTouchStart(this: Document, evt: TouchEvent) {
		const firstTouch = getTouches(evt)[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	}

	function handleTouchMove(this: Document, evt: TouchEvent) {
		if (!xDown || !yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if (Math.abs(xDiff) + Math.abs(yDiff) > swipeThreshold) {
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				/*most significant*/
				if (xDiff > 0) {
					if (onSwipeLeft) onSwipeLeft();
				} else {
					if (onSwipeRight) onSwipeRight();
				}
			} else {
				if (yDiff > 0) {
					if (onSwipeDown) onSwipeDown();
				} else {
					if (onSwipeUp) onSwipeUp();
				}
			}
			/* reset values */
			xDown = null;
			yDown = null;
		}
	}
}
