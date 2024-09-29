import { Controller, Get, Param, Query } from '@nestjs/common';
import MusicService from '../application/music.service';
import PageRequest from '../../common/page-request';

@Controller()
export default class MusicController {
	constructor(private readonly musicService: MusicService) {}

	@Get('/albums')
	async getAlbums(@Query() pageRequest: PageRequest) {
		return this.musicService.getAlbums(pageRequest);
	}

	@Get('/albums/:albumId/tracks')
	async getAlbumTracks(@Param('albumId') albumId: number) {
		return this.musicService.getAlbumTracks(albumId);
	}

	@Get('/genres')
	async getGenres(@Query() pageRequest: PageRequest) {
		pageRequest.size = 1000;
		return this.musicService.getGenres(pageRequest);
	}

	@Get('/artists')
	async getArtists(@Query() pageRequest: PageRequest) {
		return this.musicService.getArtists(pageRequest);
	}
}