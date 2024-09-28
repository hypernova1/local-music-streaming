import { IPicture } from 'music-metadata';

export default interface AudioMetadata {
	diskNo: number;
	trackNo: number;
	disk: number;
	title: string;
	albumName: string;
	artists: string[];
	picture: IPicture | null;
	albumArtist: string;
	genres: string[];
	extension: string;
	duration: number;
	releaseDate?: string;
	lyrics?: string;
}