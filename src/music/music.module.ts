import { Module } from "@nestjs/common";
import TrackRepository from "./track.repository";
import MusicController from './music.controller';
import MusicService from './music.service';

@Module({
  imports: [],
  providers: [MusicService, TrackRepository],
  controllers: [MusicController]
})
export default class MusicModule {

}