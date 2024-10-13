import Track from '../../domain/track/track.entity';

export default class TrackDto {
	id: number;
	trackNo: number;
	title: string;
	playTime: number;
	artist: { id: number; name: string };

	constructor(track: Track, artist: { id: number; name: string }) {
		this.id = track.id;
		this.trackNo = track.trackNo;
		this.title = track.title;
		this.playTime = track.playTime;
		this.artist = artist;
	}
}