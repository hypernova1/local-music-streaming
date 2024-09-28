import Album from '../../domain/album/album.entity';

export default class AlbumDto {
	id: number;
	title: string;
	artist: string;

	constructor(album: Album) {
		this.id = album.id;
		this.title = album.title;
	}

}