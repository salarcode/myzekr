let appliedThemeId = '';
let appliedThemeName = '';
const themeFixesId = 'theme-fixes-reset';

export function applyTheme(themeName: string) {
	if (themeName == appliedThemeName) return;

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
	var applied = document.getElementById(themeFixesId);
	if (applied) return;

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
