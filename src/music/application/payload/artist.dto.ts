import AlbumDto from './album.dto';
import Artist from '../../domain/artist/artist.entity';

export default class ArtistDto {
	id: number;
	name: string;
	albums: AlbumDto[];

	constructor(artist: Artist) {
		this.id = artist.id;
		this.name = artist.name;
		this.albums = artist.albumArtists.map((artistAlbum) => new AlbumDto(artistAlbum.album));
	}
}