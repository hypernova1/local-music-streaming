import { Injectable } from '@nestjs/common';
import TrackRepository from '../repository/track.repository';

@Injectable()
export default class MusicService {
	constructor(private readonly trackRepository: TrackRepository) {}
}