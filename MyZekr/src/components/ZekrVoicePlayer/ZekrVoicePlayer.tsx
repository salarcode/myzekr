import './ZekrVoicePlayer.scss';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import ReactPlayer from 'react-player';
import { Zekr } from '../../services/Zekr/models/Zekr';
import { AppSettings } from '../../services/Settings/models/AppSettings';
import { getZekrVoiceFileUrl } from '../../services/Zekr/ZekrService';
import { ZekrVoice } from '../../services/Zekr/models/ZekrVoice';

interface Props {
	zekr: Zekr;
	settings: AppSettings | undefined;
}

export const ZekrVoicePlayer: FC<Props> = ({ zekr, settings }) => {
	let [fileUrl, setFileUrl] = useState('');
	const [voiceName, setVoiceName] = useState('');
	const [playPosition, setPlayPosition] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [player, setPlayer] = useState<ReactPlayer | undefined>();
	const [played, setPlayed] = useState<string>('0:00');
	const [duration, setDuration] = useState<string>('0:00');

	if (zekr.zekrVoices && zekr.zekrVoices.length) {
		if (settings && settings.selectedVoices && settings.selectedVoices.length) {
			const selectedVoice = settings.selectedVoices.find((v) => v.zekrUid === zekr.uid);

			if (selectedVoice && selectedVoice.voiceFile) {
				let voice = zekr.zekrVoices.find((v) => v.file === selectedVoice.voiceFile);

				if (voice) {
					setVoice(voice);
				}
			}
		}
	}
	if (!fileUrl) {
		if (zekr.zekrVoices && zekr.zekrVoices.length) {
			let voice = zekr.zekrVoices[0];
			setVoice(voice);
		}
	}
	if (!fileUrl) {
		// do not render this component
		return <Fragment></Fragment>;
	}

	function setVoice(voice: ZekrVoice) {
		if (!voice) return;

		fileUrl = getZekrVoiceFileUrl(voice.file);
		setFileUrl(fileUrl);
		setVoiceName(voice.name);
	}

	function onPLayerError() {}
	function onPLayerReady(p: ReactPlayer) {
		setPlayer(p);
	}
	function onPLayerDuration(duration: number) {
		var seek = document.getElementById('playerSeek') as HTMLInputElement;
		seek.max = duration.toString();
		seek.min = '0';
		seek.value = '0';
		setDuration(formatTime(duration));
	}
	function onPLayerStart() {
		setPlaying(true);
	}
	function onPLayerPause() {
		setPlaying(false);
	}
	function onPLayerEnded() {
		setPlaying(false);
	}
	function onPLayerProgress(state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) {
		console.log(
			`onPLayerProgress: played: ${state.played}, playedSeconds: ${state.playedSeconds}, loadedSeconds: ${state.loadedSeconds}`,
		);
		setPlayPosition(state.playedSeconds);
		setPlayed(formatTime(state.playedSeconds));
	}
	function playClick() {
		setPlaying(true);
	}
	function pauseClick() {
		setPlaying(false);
	}
	function onPlayChange(e: ChangeEvent<HTMLInputElement>) {
		let position = +e.target.value;
		if (position > 0) {
			setPlayPosition(position);
			setPlayed(formatTime(position));
			player?.seekTo(position);
			setPlaying(true);
		}
	}

	function formatTime(seconds: number): string {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.round(seconds % 60);
		return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
	}

	return (
		<div className="zekr-body-play-buttons voice-player">
			<input
				value={playPosition}
				onChange={onPlayChange}
				type="range"
				id="playerSeek"
				className="range"
				max="100"
				min="0"
			/>
			<div className="voice-player-times">
				{duration} / {played}
			</div>
			{voiceName && (
				<div className="voice-player-voice-name">
					<a href="#voice">
						<img src="/assets/icons/microphone.svg" className="icon-20 link-image mx-1" alt="🎤" />
						{voiceName}
					</a>
				</div>
			)}
			<ReactPlayer
				onReady={onPLayerReady}
				onDuration={onPLayerDuration}
				onStart={onPLayerStart}
				onPause={onPLayerPause}
				onEnded={onPLayerEnded}
				onProgress={onPLayerProgress}
				onError={onPLayerError}
				width={0}
				height={0}
				playing={playing}
				url={fileUrl}
			/>
			{playing && (
				<a href="#pause" onClick={pauseClick}>
					<img src="/assets/icons/pause-button.png" className="icon-28 link-image" alt="⏸" />
				</a>
			)}
			{!playing && (
				<a href="#play" onClick={playClick}>
					<img src="/assets/icons/play-button.svg" className="icon-28 link-image" alt="▶" />
				</a>
			)}
			{/* <a href="#voice">
				<img src="/assets/icons/microphone.svg" className="icon-20 link-image" alt="🎤" />
			</a> */}
		</div>
	);
};
