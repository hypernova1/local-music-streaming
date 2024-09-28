import { IPicture } from 'music-metadata';
import fs from 'fs'
import File from '../src/file/file.entity';
import FileType from '../src/file/file-type';

export default class ImageWriter {
	/**
	 * 음원의 이미지를 저장한다.
	 * */
	static async write(picture: IPicture, filePath: string, albumName: string): Promise<File | null> {
		const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
		if (!supportedMimeTypes.includes(picture.format)) {
			console.warn(`지원하지 않는 포맷: ${picture.format}}`);
			return null;
		}

		const imageUintArray = picture.data;
		const imageFormat = picture.format;
		const pathArr = filePath.split('\\');
		const folderPath = pathArr.slice(0, -1).join('\\');

		const extension = imageFormat.split('/')[1];
		const replacedAlbumName = albumName
			.split('/')
			.join('_')
			.split('"')
			.join('')
			.split("'")
			.join('')
			.split('?')
			.join('')
			.split('!')
			.join('');
		const imagePath = folderPath + '\\' + replacedAlbumName + '.' + extension;

		try {
			fs.accessSync(imagePath);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			fs.writeFileSync(imagePath, imageUintArray);
		}

		return File.from({
			size: imageUintArray.length,
			path: imagePath,
			extension: extension,
			type: FileType.IMAGE,
		});
	}
}