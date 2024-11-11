import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Database } from 'src/database/database.service';

@Module({
  imports: [Database],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
