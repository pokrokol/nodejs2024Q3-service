import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Database } from 'src/database/database.service';

@Module({
  imports: [Database],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
