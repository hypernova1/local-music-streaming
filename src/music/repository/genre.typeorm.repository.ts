import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Genre from '../domain/genre/genre.entity';
import GenreRepository from '../domain/genre/genre.repository';

@Injectable()
export default class GenreTypeormRepository extends Repository<Genre> implements GenreRepository {
	constructor(dataSource: DataSource) {
		super(Genre, dataSource.createEntityManager());
	}

	async findAllAndCount() {
		return this.createQueryBuilder()
			.getManyAndCount();
	}
}