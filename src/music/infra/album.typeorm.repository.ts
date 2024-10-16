import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Album from '../domain/album/album.entity';
import AlbumRepository from '../domain/album/album.repository';
import PageRequest from '../../common/page-request';

@Injectable()
export default class AlbumTypeormRepository extends Repository<Album> implements AlbumRepository {
	constructor(dataSource: DataSource) {
		super(Album, dataSource.createEntityManager());
	}

	async findAllAndCount(pageRequest: PageRequest) {
		return this.createQueryBuilder('album')
			.leftJoinAndSelect('album.albumArtists', 'albumArtist')
			.leftJoinAndSelect('albumArtist.artist', 'artist')
			.take(pageRequest.limit)
			.offset(pageRequest.offset)
			.getManyAndCount();
	}

	findByArtistId(artistId: number): Promise<Album[]> {
		return this.createQueryBuilder('album')
			.leftJoinAndSelect('album.albumArtists', 'albumArtist')
			.leftJoinAndSelect('albumArtist.artist', 'artist')
			.where('artist.id = :artistId', { artistId })
			.getMany();
	}
}