import { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store/store';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { readSettingsActionCreator, saveSettingsActionCreator } from '../../store/Actions/SettingsActions';
import { AnyAction } from 'redux';
import AddImage from '../../assets-offline/icons/add.svg';
import RemoveImage from '../../assets-offline/icons/remove.svg';

interface Props {
	settings?: AppSettings;
	settingsLoading: boolean;
	saveSettings: (settings: AppSettings) => void;
}

const TextZoomButtons: FC<Props> = ({ settingsLoading, settings, saveSettings }) => {
	function saveChanges() {
		if (settings) saveSettings(settings);
	}
	const fontUnit = 'rem';

	function onAddClick(e: any) {
		e.preventDefault();
		if (!settings) return;

		var fontSize = parseFloat(settings.textSettings.bodyFontSize);
		var alternateFontSize = parseFloat(settings.textSettings.alternateBodyFontSize);

		fontSize += 0.1;
		alternateFontSize += 0.1;
		if (fontSize > 3.3 || alternateFontSize > 3.3) {
			return;
		}
		settings.textSettings.bodyFontSize = fontSize + fontUnit;
		settings.textSettings.alternateBodyFontSize = alternateFontSize + fontUnit;
		saveChanges();
	}

	function onRemoveClick(e: any) {
		e.preventDefault();
		if (!settings) return;

		var fontSize = parseFloat(settings.textSettings.bodyFontSize);
		var alternateFontSize = parseFloat(settings.textSettings.alternateBodyFontSize);

		fontSize -= 0.1;
		alternateFontSize -= 0.1;
		if (fontSize < 0.5 || alternateFontSize < 0.5) {
			return;
		}

		settings.textSettings.bodyFontSize = fontSize + fontUnit;
		settings.textSettings.alternateBodyFontSize = alternateFontSize + fontUnit;
		saveChanges();
	}
	return (
		<Fragment>
			<a href="#add" onClick={onAddClick}>
				<img src={AddImage} alt="+" className="icon-24 link-image" />
				{/* <i className="fas fa-minus-circle fa-lg"></i> */}
			</a>
			<a href="#remove" onClick={onRemoveClick}>
				<img src={RemoveImage} alt="-" className="icon-24 link-image" />
				{/* <i className="fas fa-plus-circle fa-lg"></i> */}
			</a>
		</Fragment>
	);
};

const mapStateToProps = (store: AppState) => {
	return {
		settings: store.settingsState.settings,
		settingsLoading: store.settingsState.loading,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		readSettings: () => dispatch(readSettingsActionCreator()),
		saveSettings: (settings: AppSettings) => dispatch(saveSettingsActionCreator(settings)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TextZoomButtons);
