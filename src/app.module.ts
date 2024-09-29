import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/persistence/ormconfig';
import MusicModule from './music/music.module';
import datasource from './config/persistence/datasource';
import AppController from './app.controller';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory() {
				return typeormConfig;
			},
			async dataSourceFactory() {
				return datasource;
			},
		}),
		MusicModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
