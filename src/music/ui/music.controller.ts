import { Controller, Get, Query } from '@nestjs/common';
import MusicService from '../application/music.service';
import PageRequest from '../../common/page-request';

@Controller()
export default class MusicController {
	constructor(private readonly musicService: MusicService) {}

	@Get('/graph/albums')
	async getAlbums(@Query() pageRequest: PageRequest) {
		return await this.musicService.getAlbums(pageRequest);
	}

	@Get('/graph/genres')
	async getGenres(@Query() pageRequest: PageRequest) {
		pageRequest.size = 1000;
		return await this.musicService.getGenres(pageRequest);
	}

	@Get('/graph/artists')
	async getArtists(@Query() pageRequest: PageRequest) {
		await this.musicService.getArtists(pageRequest);
	}
}