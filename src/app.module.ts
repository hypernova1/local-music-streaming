import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeormConfig } from './config/persistence/ormconfig';
import MusicModule from "./music/music.module";
import datasource from './config/persistence/datasource';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory() {
      return typeormConfig;
    },
    async dataSourceFactory() {
      return datasource;
    }
  }), MusicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
