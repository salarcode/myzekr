import './ZekrBodyText.scss';
import React, { FC, useState } from 'react';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { ZekrBody } from '../../services/Zekr/models/ZekrBody';
import { Conditional } from '../Conditional/Conditional';
import { DiacriticsText } from '../DiacriticsText/DiacriticsText';

interface Props {
	body: ZekrBody | undefined;
	lineSeparator?: boolean;
	settings?: AppSettings;
}

export const ZekrBodyText: FC<Props> = ({ body, lineSeparator = true, settings }) => {
	const useDiacriticsTextLang = 'ar';
	const [displayOptional, setDisplayOptional] = useState(body?.optional ?? false);

	if (!body) return null;

	let textCss = {};
	let textTranslationCss = {};

	if (settings) {
		textCss = {
			fontFamily: settings.textSettings.bodyFont,
			fontSize: settings.textSettings.bodyFontSize,
		};
		textTranslationCss = {
			fontFamily: settings.textSettings.alternateBodyFont,
			fontSize: settings.textSettings.alternateBodyFontSize,
		};
	}
	function optionalButtonClick() {
		setDisplayOptional(false);
	}

	return (
		<div className="zekr-body">
			{displayOptional && (
				<button type="button" className="btn btn-sm btn-outline-success" onClick={optionalButtonClick}>
					{body.optionalText || '...'}
				</button>
			)}
			<div className="zekr-body-wrapper" style={displayOptional ? { display: 'none' } : {}}>
				{body.languageKey === useDiacriticsTextLang ? (
					<DiacriticsText
						unsafeHtmlText={body.body}
						styles={textCss}
						colouredDiacritics={settings?.colouredDiacritics}
					/>
				) : (
					<div
						className="zekr-body-text"
						style={textTranslationCss}
						dangerouslySetInnerHTML={{
							__html: body.body,
						}}
					/>
				)}

				<Conditional condition={body.translationBody != null}>
					<div className="zekr-body-alternative">
						<ZekrBodyText body={body.translationBody} lineSeparator={false} settings={settings} />
					</div>
				</Conditional>
				<Conditional condition={body.alternateBodyList != null && body.alternateBodyList.length > 0}>
					<div className="zekr-body-alternative">
						{body.alternateBodyList?.map((altBody, index) => (
							<ZekrBodyText body={altBody} lineSeparator={false} key={index} settings={settings} />
						))}
					</div>
				</Conditional>
			</div>
			{lineSeparator && <hr className="zekr-line zekr-body-line " />}
		</div>
	);
};
