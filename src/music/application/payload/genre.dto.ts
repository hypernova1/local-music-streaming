import Genre from '../../domain/genre/genre.entity';

export default class GenreDto {
	id: number;
	name: string;

	constructor(genre: Genre) {
		this.id = genre.id;
		this.name = genre.name;
	}

}