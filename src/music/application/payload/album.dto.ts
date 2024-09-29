import Album from '../../domain/album/album.entity';

export default class AlbumDto {
	id: number;
	title: string;
	totalPlayTime: number;
	artists: string[];

	constructor(album: Album) {
		this.id = album.id;
		this.title = album.title;
		this.totalPlayTime = album.totalPlayTime;
		this.artists = album.albumArtists.map((albumArtist) => albumArtist.artist.name);
	}
}