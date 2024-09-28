import { Module } from '@nestjs/common';
import TrackRepository from './repository/track.repository';
import MusicController from './ui/music.controller';
import MusicService from './application/music.service';

@Module({
	imports: [],
	providers: [MusicService, TrackRepository],
	controllers: [MusicController],
})
export default class MusicModule {}