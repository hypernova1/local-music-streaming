import { Injectable } from '@nestjs/common';
import TrackRepository from './track.repository';

@Injectable()
export default class MusicService {
  constructor(private readonly trackRepository: TrackRepository) {}
}