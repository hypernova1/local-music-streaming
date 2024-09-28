import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export default class TransformPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		const dtoClass = metadata.metatype; // 메타타입을 DTO 클래스로 사용

		if (!dtoClass || !this.toValidate(dtoClass)) {
			return value;
		}

		const object = plainToInstance(dtoClass, value); // 객체 변환

		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException();
		}

		return object;
	}

	private toValidate(metatype: any): boolean {
		const types = [String, Number, Boolean, Array]; // 기본형 검증
		return !types.includes(metatype);
	}
}