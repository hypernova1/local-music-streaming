import { Module } from '@nestjs/common';
import FileRepository from './file.repository';

@Module({
	providers: [FileRepository],
})
export default class FileModule {}