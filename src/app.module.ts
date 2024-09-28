import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './persistence/ormconfig';
import MusicModule from "./music/music.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), MusicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
