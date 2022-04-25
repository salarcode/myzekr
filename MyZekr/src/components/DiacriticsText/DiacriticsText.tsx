import './DiacriticsText.scss';
import React, { CSSProperties, FC } from 'react';

interface Props {
	unsafeHtmlText: string;
	styles?: CSSProperties;
	colouredDiacritics?: boolean;
	languageKey?: string;
}

function removeAccent(str: string): string {
	if (!str) return str;
	var diacritics = ['ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ', 'ّ', 'ْ', '\u0670'];

	var result = '';
	for (let index = 0; index < str.length; index++) {
		const c = str[index];
		if (diacritics.indexOf(c) === -1) result += c;
		else {
			// keeping tashdid on allah word
			if (
				c === 'ّ' /* tashdid */ &&
				findNonAccentChar(str, index, -1) === 'ل' &&
				findNonAccentChar(str, index, +1) === 'ه'
			) {
				result += c;
			}
		}
	}

	function findNonAccentChar(str: string, index: number, searchStep: number): string | undefined {
		index += searchStep;

		while (str.length > index || index < 0) {
			const c = str[index];
			if (diacritics.indexOf(c) === -1) return c;

			index += searchStep;
		}
		return undefined;
	}

	return result;
}

/**
 * Display accent chars in different color
 * @param param0 the html text
 */
export const DiacriticsText: FC<Props> = ({ unsafeHtmlText, styles, colouredDiacritics, languageKey }) => {
	if (colouredDiacritics)
		return (
			<div className="diacritics-text" style={styles} lang={languageKey}>
				<div
					className="diacritics-org"
					dangerouslySetInnerHTML={{
						__html: unsafeHtmlText,
					}}
				></div>
				<div
					className="diacritics-plain no-pointer-events"
					dangerouslySetInnerHTML={{
						__html: removeAccent(unsafeHtmlText),
					}}
				></div>
			</div>
		);
	else
		return (
			<div className="diacritics-text" style={styles} lang={languageKey}>
				<div
					className="diacritics-simple"
					dangerouslySetInnerHTML={{
						__html: unsafeHtmlText,
					}}
				></div>
			</div>
		);
};
