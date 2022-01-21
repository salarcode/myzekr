let appliedThemeId = '';
let appliedThemeName = '';
let setBrowserColorTimeout: NodeJS.Timeout | null = null;
const themeFixesId = 'theme-fixes-reset';

export function applyTheme(themeName: string) {
	if (themeName === appliedThemeName) return;

	if (appliedThemeId) {
		var applied = document.getElementById(appliedThemeId);
		if (applied) applied.remove();
	}
	var styleSheet = getThemeStylesheet(themeName);
	if (!styleSheet || !styleSheet.file) {
		appliedThemeId = '';
		appliedThemeName = '';
		removeThemeFixes();
		markDarkTheme(false);
		setBrowserColor();
		return;
	}
	appliedThemeName = themeName;
	appliedThemeId = 'theme-' + themeName;
	var url = '/themes/' + styleSheet.file;

	const linkTheme = document.createElement('link');
	linkTheme.type = 'text/css';
	linkTheme.rel = 'stylesheet';
	linkTheme.href = url;
	linkTheme.id = appliedThemeId;
	document.getElementsByTagName('head')[0].appendChild(linkTheme);

	markDarkTheme(styleSheet.isDark);
	addThemeFixes();
	setBrowserColor();
}

function markDarkTheme(isDark: boolean) {
	let body = document.getElementsByTagName('body')[0];

	let className = body.className;
	if (isDark) {
		if (!className.includes('theme-dark')) {
			className += ' theme-dark';
		}
	} else {
		className = className.replace('theme-dark', '');
	}
	body.className = className;
}

// theme-fixes.css
function addThemeFixes() {
	// need to remove first then add, to keep higher order
	removeThemeFixes();

	const linkTheme = document.createElement('link');
	linkTheme.type = 'text/css';
	linkTheme.rel = 'stylesheet';
	linkTheme.href = '/themes/theme-fixes.css';
	linkTheme.id = themeFixesId;
	document.getElementsByTagName('head')[0].appendChild(linkTheme);
}
function removeThemeFixes() {
	var applied = document.getElementById(themeFixesId);
	if (applied) applied.remove();
}

function getThemeStylesheet(name: string) {
	if (!name) return null;
	switch (name.toLowerCase()) {
		case 'normal':
		case 'default':
			return {
				file: '',
				isDark: false,
			};
		case 'brown':
			return {
				file: 'theme-brown.css',
				isDark: true,
			};
		case 'dark':
			return {
				file: 'theme-dark.css',
				isDark: true,
			};
	}
	return null;
}
function setBrowserColor() {
	setBrowserColorNow();

	if (setBrowserColorTimeout) {
		clearTimeout(setBrowserColorTimeout);
	}
	// Note: timeout is needed to handle css files load time
	setBrowserColorTimeout = setTimeout(setBrowserColorNow, 600);
}

function setBrowserColorNow() {
	let siteHeader = document.querySelector('.site-header');
	let metaThemeColor = document.querySelector("meta[name='theme-color']") as HTMLMetaElement;
	if (!siteHeader || !metaThemeColor) return;

	let styles = window.getComputedStyle(siteHeader);
	let color = styles.backgroundColor;
	if (!color) return;

	metaThemeColor.content = color;
}
