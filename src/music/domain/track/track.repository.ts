import Track from './track.entity';

export default interface TrackRepository {
	findByAlbumId(albumId: number): Promise<Track[]>;
}