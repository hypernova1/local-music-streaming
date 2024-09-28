import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default abstract class PageRequest {
	@IsNumber()
	@Type(() => Number)
	page: number = 1;

	@IsNumber()
	@Type(() => Number)
	size: number = 20;

	get offset(): number {
		return ((this.page || 1) - 1) * (this.size || 20);
	}

	get limit(): number {
		return this.size || 20;
	}
}