import Track from '../../domain/track/track.entity';

export default class TrackDto {
	id: number;
	trackNo: number;
	title: string;
	playTime: number;
	artistName: string;

	constructor(track: Track, artistName: string) {
		this.id = track.id;
		this.trackNo = track.trackNo;
		this.title = track.title;
		this.playTime = track.playTime;
		this.artistName = artistName;
	}
}