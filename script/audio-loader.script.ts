import * as fs from 'fs';
import * as path from 'path';
import { IPicture, loadMusicMetadata } from 'music-metadata';
import MusicMetadata from './music-metadata';
import Track from '../src/music/domain/track.entity';
import Album from '../src/music/domain/album.entity';
import Artist from '../src/music/domain/artist.entity';

const albums: Album[] = [];
const artists: Artist[] = [];
const tracks: Track[] = [];

/**
 * 경로 내의 모든 오디오 파일의 메타 데이터를 저장한다.
 * */
async function readFiles(rootPath: string) {
	const dir = fs.readdirSync(rootPath);
	for (const filePath of dir) {
		const fullFilePath = path.join(rootPath, filePath);
		const stats = fs.statSync(fullFilePath);

		if (stats.isDirectory()) {
			await readFiles(fullFilePath);
		} else {
			const metadata = await parseAudioFile(fullFilePath);
			const audioSize = stats.size;
			artists.push(Artist.from({
				name: metadata.artists[0]
			}))
			console.log(metadata);
		}
	}
}

/**
 * 오디오 파일의 메타데이터를 가져온다.
 * */
async function parseAudioFile(path: string) {
	const { parseFile } = await loadMusicMetadata();
	const metadata = await parseFile(path);
	console.log(metadata);
	await saveImage(metadata.common.picture[0], path, metadata.common.album);
	return {
		diskNo: metadata.common.disk.no,
		trackNo: metadata.common.track.no,
		title: metadata.common.title,
		albumName: metadata.common.album,
		artists: metadata.common.artists.length ? metadata.common.artists : [metadata.common.artist],
		genres: metadata.common.genre,
		albumArtist: metadata.common.albumartist,
		extension: metadata.format.container,
		duration: metadata.format.duration,
		releaseDate: metadata.common.releasedate,
	} as MusicMetadata;
}

/**
 * 이미지를 저장 후 이미지 경로와 크기를 반환한다.
 * */
async function saveImage(picture: IPicture, path: string, albumName: string) {
	const imageUintArray = picture.data;
	const imageFormat = picture.format;
	const pathArr = path.split('\\');
	const folderPath = pathArr.slice(0, -1).join('\\');

	const imagePath = folderPath + '\\' + albumName + '.' + imageFormat.split('/')[1];

	try {
		fs.accessSync(imagePath)
	} catch (e) {
		fs.writeFileSync(imagePath, imageUintArray);
	}

	return { imagePath, byte: imageUintArray.length };
}

parseAudioFile('E:Music\\metal\\Paradox\\Massacre Of The Cathars_17607.MP3');

// readFiles('E:Music');