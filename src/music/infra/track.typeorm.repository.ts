import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Track from '../domain/track/track.entity';
import TrackRepository from '../domain/track/track.repository';
import PageRequest from '../../common/page-request';

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

	findAllAndCount(pageRequest: PageRequest): Promise<[Track[], number]> {
		return this.createQueryBuilder('track')
			.take(pageRequest.limit)
			.offset(pageRequest.offset)
			.getManyAndCount();
	}
}