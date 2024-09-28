import { Module } from "@nestjs/common";
import TrackRepository from "./track.repository";

@Module({
  imports: [],
  providers: [TrackRepository],
})
export default class MusicModule {

}