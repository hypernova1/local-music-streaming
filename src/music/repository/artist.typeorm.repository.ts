import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Artist from '../domain/artist/artist.entity';
import ArtistRepository from '../domain/artist/artist.repository';

@Injectable()
export default class ArtistTypeormRepository extends Repository<Artist> implements ArtistRepository {
	constructor(dataSource: DataSource) {
		super(Artist, dataSource.createEntityManager());
	}
}