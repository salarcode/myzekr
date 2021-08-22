export interface AppSettings {
	colouredDiacritics: boolean;
	enableTranslations: boolean;
	homePage: HomePageSettings;
	theme: AppThemeSettings;
	textSettings: BodyTextSettings;
	userFavorites: UserFavoriteItem[];
}

export function getAppSettingsInitial(): AppSettings {
	return {
		colouredDiacritics: true,
		enableTranslations: true,
		homePage: {
			displayFavorites: true,
			displayTodayPlan: true,
			displayTodaySuggestions: true,
		},
		textSettings: {
			alternateBodyFont: 'Vazir',
			alternateBodyFontSize: '0.85rem',
			bodyFont: 'Parastoo',
			bodyFontSize: '1.2rem',
			benefitsFontSize: '1rem',
			stackedZekrBody: false,
		},
		theme: {
			isDarkMode: false,
			name: 'default',
		},
		userFavorites: [],
	};
}
interface HomePageSettings {
	displayFavorites: boolean;
	displayTodayPlan: boolean;
	displayTodaySuggestions: boolean;
}
interface AppThemeSettings {
	isDarkMode: false;
	name: string;
}
interface BodyTextSettings {
	bodyFont: string;
	bodyFontSize: string;
	alternateBodyFont: string;
	alternateBodyFontSize: string;
	benefitsFontSize: string;
	stackedZekrBody: boolean;
}
interface UserFavoriteItem {
	zekrUid: string;
}
