import AudioMetadata from './audio-metadata';
import { IPicture, loadMusicMetadata } from 'music-metadata';
import type { IAudioMetadata, IOptions } from 'music-metadata/lib/type';

export default class AudioMetadataParser {

	private parseFile: (filePath: string, options?: IOptions) => Promise<IAudioMetadata>;

	constructor() {
		this.loadParser();
	}

	/**
	 * 오디오의 메타데이터를 파싱한다.
	 * */
	async parse(filePath: string): Promise<AudioMetadata> {
		const metadata = await this.parseFile(filePath);
		let lyrics = '';
		if (metadata.common.lyrics) {
			lyrics = metadata.common.lyrics[0]?.text;
		}

		let picture: IPicture | null = null;
		if (metadata.common.picture) {
			picture = metadata.common.picture[0];
		}
		return {
			diskNo: metadata.common.disk.no,
			trackNo: metadata.common.track.no,
			title: metadata.common.title,
			albumName: metadata.common.album,
			artists: metadata.common.artists?.length ? metadata.common.artists : [metadata.common.artist],
			genres: metadata.common.genre,
			albumArtist: metadata.common.albumartist,
			extension: metadata.format.container,
			duration: metadata.format.duration,
			releaseDate: metadata.common.releasedate,
			lyrics: lyrics,
			picture: picture,
		} as AudioMetadata;
	}

	/**
	 * 파서를 한 번만 로드하여 parseFile 함수 캐싱
	 */
	private async loadParser() {
		const { parseFile } = await loadMusicMetadata();
		this.parseFile = parseFile;
	}
}