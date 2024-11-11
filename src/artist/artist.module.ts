import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Database } from 'src/database/database.service';

@Module({
  imports: [Database],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
