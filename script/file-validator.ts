const audioFormats = [
	'WAV',
	'wav',
	'AIFF',
	'aiff',
	'PCM',
	'pcm',
	'MP3',
	'mp3',
	'AAC',
	'aac',
	'OGG',
	'ogg',
	'FLAC',
	'flac',
	'ALAC',
	'alac',
	'WAVPACK',
	'wavpack',
	'DSD',
	'dsd',
	'M4A',
	'm4a',
	'SPEEX',
	'speex',
	'WEBM',
	'webm',
	'OPUS',
	'opus',
];

export default class FileValidator {
	/**
	 * 오디오 파일인지 확인한다.
	 */
	static isAudioFile(filePath: string): boolean {
		for (const audioFormat of audioFormats) {
			if (filePath.endsWith(audioFormat)) {
				return true;
			}
		}
		return false;
	}
}