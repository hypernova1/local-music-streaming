import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default abstract class PageRequest {
	private readonly DEFAULT_SIZE = 50

	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsNumber()
	@Type(() => Number)
	size: number = this.DEFAULT_SIZE;

	get offset(): number {
		return ((this.page || 1) - 1) * (this.size || this.DEFAULT_SIZE);
	}

	get limit(): number {
		return this.size || this.DEFAULT_SIZE;
	}
}