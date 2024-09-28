import { Controller, Get } from '@nestjs/common';
import MusicService from '../application/music.service';

@Controller()
export default class MusicController {
	constructor(private readonly musicService: MusicService) {}

	@Get('/test')
	async test() {
	}
}