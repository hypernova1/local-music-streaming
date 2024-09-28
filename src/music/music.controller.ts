import { Controller } from '@nestjs/common';
import MusicService from './music.service';

@Controller()
export default class MusicController {
	constructor(private readonly musicService: MusicService) {}
}