import { DataSource, Repository } from 'typeorm';
import File from './file.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FileRepository extends Repository<File> {
	constructor(dataSource: DataSource) {
		super(File, dataSource.createEntityManager());
	}
}