import PageRequest from '../../../common/page-request';
import Artist from './artist.entity';

export default interface ArtistRepository {

	findAllAndCount(pageRequest: PageRequest): Promise<[Artist[], number]>;

	findByIds(numbers: number[]): Promise<Artist[]>;
}