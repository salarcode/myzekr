const deviceSupportsTouch = () => {
	// source: https://stackoverflow.com/q/41219542/322446
	if ('ontouchstart' in window || window.TouchEvent) return true;

	if (window['DocumentTouch'] && document instanceof window['DocumentTouch']) return true;

	const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
	const queries = prefixes.map((prefix) => `(${prefix}touch-enabled)`);

	return window.matchMedia(queries.join(',')).matches;
};
module.exports.deviceSupportsTouch = deviceSupportsTouch;
