import { Module } from '@nestjs/common';
import TrackTypeormRepository from './infra/track.typeorm.repository';
import MusicController from './ui/music.controller';
import MusicService from './application/music.service';
import GenreTypeormRepository from './infra/genre.typeorm.repository';
import AlbumTypeormRepository from './infra/album.typeorm.repository';
import ArtistTypeormRepository from './infra/artist.typeorm.repository';
import { ALBUM_REPOSITORY, ARTIST_REPOSITORY, GENRE_REPOSITORY, TRACK_REPOSITORY } from '../common/token';

@Module({
	imports: [],
	providers: [
		MusicService,
		{
			provide: TRACK_REPOSITORY,
			useClass: TrackTypeormRepository,
		},
		{
			provide: GENRE_REPOSITORY,
			useClass: GenreTypeormRepository,
		},
		{
			provide: ALBUM_REPOSITORY,
			useClass: AlbumTypeormRepository,
		},
		{
			provide: ARTIST_REPOSITORY,
			useClass: ArtistTypeormRepository,
		},
	],
	controllers: [MusicController],
})
export default class MusicModule {}
