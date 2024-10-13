import Album from '../../domain/album/album.entity';

export default class AlbumDto {
	id: number;
	title: string;
	totalPlayTime: number;
	artists: {
		id: number;
		name: string;
	}[];

	constructor(album: Album, artists: { id: number; name: string }[]) {
		this.id = album.id;
		this.title = album.title;
		this.totalPlayTime = album.totalPlayTime;
		this.artists = artists;
	}
}