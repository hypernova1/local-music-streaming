import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Album from './album.entity';

@Entity({
	comment: '앨범 이미지 파일',
	name: 'album_image_file',
})
export default class AlbumImageFile {
	@OneToOne(() => Album, (album) => album.albumImageFile)
	@JoinColumn({
		name: 'album_id',
	})
	album: Album;

	@PrimaryColumn({
		comment: '파일 아이디',
		name: 'file_id',
		type: 'bigint',
		unsigned: true,
	})
	fileId: number;

	@PrimaryColumn({
		comment: '앨범 아이디',
		name: 'album_id',
		type: 'bigint',
		unsigned: true,
	})
	albumId: number;
}