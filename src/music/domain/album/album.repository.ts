import PageRequest from '../../../common/page-request';
import Album from './album.entity';

export default interface AlbumRepository {
	findAllAndCount(pageRequest: PageRequest): Promise<[Album[], number]>;
}