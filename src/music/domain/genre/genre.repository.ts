import Genre from './genre.entity';

export default interface GenreRepository {
	findAllAndCount(): Promise<[Genre[], number]>;
}