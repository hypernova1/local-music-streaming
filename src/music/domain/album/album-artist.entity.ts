import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Album from './album.entity';
import Artist from '../artist/artist.entity';

@Entity({
	comment: '앨범 아티스트',
	name: 'album_artist'
})
export default class AlbumArtist {
	@PrimaryColumn({
		comment: '앨범 아이디',
		name: 'album_id',
		type: 'bigint',
		unsigned: true,
	})
	albumId: number;

	@PrimaryColumn({
		comment: '아티스트 아이디',
		name: 'artist_id',
		type: 'bigint',
		unsigned: true,
	})
	artistId: number;

	@ManyToOne(() => Album)
	@JoinColumn({
		name: 'album_id',
	})
	album: Album;

	@ManyToOne(() => Artist)
	@JoinColumn({
		name: 'artist_id',
	})
	artist: Artist;

}