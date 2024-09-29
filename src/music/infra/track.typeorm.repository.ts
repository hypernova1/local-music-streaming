import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Track from '../domain/track/track.entity';
import TrackRepository from '../domain/track/track.repository';

@Injectable()
export default class TrackTypeormRepository extends Repository<Track> implements TrackRepository {
	constructor(dataSource: DataSource) {
		super(Track, dataSource.createEntityManager());
	}

	findByAlbumId(albumId: number): Promise<Track[]> {
		return this.createQueryBuilder('track')
			.where('track.albumId = :albumId', { albumId })
			.orderBy('track.trackNo', 'ASC')
			.getMany();
	}
}