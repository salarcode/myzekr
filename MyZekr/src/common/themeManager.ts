let appliedThemeName = '';
let setBrowserColorTimeout: NodeJS.Timeout | null = null;

// Theme link element IDs
const THEME_DARK_ID = 'theme-dark';
const THEME_BROWN_ID = 'theme-brown';
const THEME_FIXES_ID = 'theme-fixes';

enum ThemeStatus {
	AlwaysEnabled,
	Disabled,
	PrefersDark,
	PrefersLight,
}

export function applyTheme(themeName: string) {
	if (themeName === appliedThemeName) return;

	appliedThemeName = themeName;

	const themeConfig = getThemeConfig(themeName);
	if (!themeConfig) return;

	// Update media attributes for all theme stylesheets
	updateThemeStylesheet(THEME_DARK_ID, themeConfig.dark);
	updateThemeStylesheet(THEME_BROWN_ID, themeConfig.brown);
	updateThemeStylesheet(THEME_FIXES_ID, themeConfig.fixes);

	// Ensure all theme stylesheets are at the end of head
	ensureThemeStylesheetsAtEnd();

	markDarkTheme(themeConfig.isDark);
	setBrowserColor();
}

function updateThemeStylesheet(linkId: string, themeStatus: ThemeStatus) {
	const link = document.getElementById(linkId) as HTMLLinkElement;
	if (link) {
		switch (themeStatus) {
			case ThemeStatus.AlwaysEnabled:
				link.media = 'all';
				link.removeAttribute('disabled');
				break;
			case ThemeStatus.Disabled:
				link.media = 'not all';
				link.setAttribute('disabled', '');
				break;
			case ThemeStatus.PrefersDark:
				link.media = '(prefers-color-scheme: dark)';
				link.removeAttribute('disabled');
				break;
			case ThemeStatus.PrefersLight:
				link.media = '(prefers-color-scheme: light)';
				link.removeAttribute('disabled');
				break;
		}

		// Re-append to head to ensure it stays at the end after React adds dynamic styles
		const head = document.getElementsByTagName('head')[0];
		head.appendChild(link);
	}
}

function ensureThemeStylesheetsAtEnd() {
	const head = document.getElementsByTagName('head')[0];
	const themeIds = [THEME_DARK_ID, THEME_BROWN_ID, THEME_FIXES_ID];

	// Re-append all theme stylesheets in order to ensure they're at the end
	themeIds.forEach((id) => {
		const link = document.getElementById(id);
		if (link) {
			head.appendChild(link);
		}
	});
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

function getThemeConfig(name: string) {
	if (!name) return null;

	switch (name.toLowerCase()) {
		case 'normal':
		case 'default':
		case 'light':
			return {
				dark: ThemeStatus.Disabled,
				brown: ThemeStatus.Disabled,
				fixes: ThemeStatus.Disabled,
				isDark: false,
			};
		case 'dark':
			return {
				dark: ThemeStatus.AlwaysEnabled,
				brown: ThemeStatus.Disabled,
				fixes: ThemeStatus.AlwaysEnabled,
				isDark: true,
			};
		case 'brown':
			return {
				dark: ThemeStatus.Disabled,
				brown: ThemeStatus.AlwaysEnabled,
				fixes: ThemeStatus.AlwaysEnabled,
				isDark: true,
			};
		case 'system':
			return {
				dark: ThemeStatus.PrefersDark,
				brown: ThemeStatus.Disabled,
				fixes: ThemeStatus.PrefersDark,
				isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
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
