export default interface MusicMetadata {
	diskNo: number;
	trackNo: number;
	disk: number;
	title: string;
	albumName: string;
	artists: string[];
	picture: string;
	albumArtist: string;
	genres: string[];
	extension: string;
	duration: number;
	releaseDate: string;
}