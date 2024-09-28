import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Track from '../domain/track.entity';

@Injectable()
export default class TrackRepository extends Repository<Track> {
	constructor(dataSource: DataSource) {
		super(Track, dataSource.createEntityManager());
	}
}