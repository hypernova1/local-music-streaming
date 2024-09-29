import Track from './track.entity';
import PageRequest from '../../../common/page-request';

export default interface TrackRepository {
	findByAlbumId(albumId: number): Promise<Track[]>;
	findAllAndCount(pageRequest: PageRequest): Promise<[Track[], number]>;
}