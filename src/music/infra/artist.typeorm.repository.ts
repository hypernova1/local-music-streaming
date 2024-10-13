import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Artist from '../domain/artist/artist.entity';
import ArtistRepository from '../domain/artist/artist.repository';
import PageRequest from '../../common/page-request';

@Injectable()
export default class ArtistTypeormRepository extends Repository<Artist> implements ArtistRepository {
	constructor(dataSource: DataSource) {
		super(Artist, dataSource.createEntityManager());
	}

	findAllAndCount(pageRequest: PageRequest): Promise<[Artist[], number]> {
		return this.createQueryBuilder('artist')
			.leftJoinAndSelect('artist.albumArtists', 'albumArtist')
			.leftJoinAndSelect('albumArtist.album', 'album')
			.take(pageRequest.limit)
			.offset(pageRequest.offset)
			.getManyAndCount();
	}

	findById(id: number): Promise<Artist> {
		return this.createQueryBuilder('artist')
			.where('artist.id = :id', { id })
			.getOne();
	}
}