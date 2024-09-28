import { Inject, Injectable } from '@nestjs/common';
import PageRequest from '../../common/page-request';
import GenreRepository from '../domain/genre/genre.repository';
import { ALBUM_REPOSITORY, ARTIST_REPOSITORY, GENRE_REPOSITORY, TRACK_REPOSITORY } from '../../common/token';
import ArtistRepository from '../domain/artist/artist.repository';
import AlbumRepository from '../domain/album/album.repository';
import TrackRepository from '../domain/track/track.repository';
import PageResponse from '../../common/page-response';
import GenreDto from './payload/genre.dto';
import AlbumDto from './payload/album.dto';

@Injectable()
export default class MusicService {
	constructor(
		@Inject(GENRE_REPOSITORY)
		private readonly genreRepository: GenreRepository,
		@Inject(ARTIST_REPOSITORY)
		private readonly artistRepository: ArtistRepository,
		@Inject(ALBUM_REPOSITORY)
		private readonly albumRepository: AlbumRepository,
		@Inject(TRACK_REPOSITORY)
		private readonly trackRepository: TrackRepository
	) {}

	async getGenres(pageRequest: PageRequest) {
		const [genres, numberOfGenres] = await this.genreRepository.findAllAndCount();

		const items = genres.map((genre) => new GenreDto(genre));

		return new PageResponse(numberOfGenres, items, pageRequest)
	}

	async getAlbums(pageRequest: PageRequest) {
		const [albums, numberOfAlbums] = await this.albumRepository.findAllAndCount(pageRequest);
		const items = albums.map((album) => new AlbumDto(album));

		return new PageResponse(numberOfAlbums, items, pageRequest);
	}

	async getArtists(pageRequest: PageRequest) {}
}