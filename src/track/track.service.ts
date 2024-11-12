import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Database } from 'src/database/database.service';
import { plainToClass } from 'class-transformer';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly DBService: Database) {}

  findAll(): Track[] {
    return this.DBService.getTracks();
  }

  findOne(id: string): Track {
    const track = this.DBService.getTrackById(id);
    if (!track) throw new NotFoundException('Track not found');
    return plainToClass(Track, track);
  }

  create(createTrackDto: CreateTrackDto): Track {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId || null,
      createTrackDto.albumId || null,
      createTrackDto.duration,
    );
    this.DBService.addTrack(track);
    return plainToClass(Track, track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);

    Object.assign(track, {
      name: updateTrackDto.name || track.name,
      artistId: updateTrackDto.artistId ?? track.artistId,
      albumId: updateTrackDto.albumId ?? track.albumId,
      duration: updateTrackDto.duration ?? track.duration,
    });

    this.DBService.updateTrack(track);
    return plainToClass(Track, track);
  }

  remove(id: string): void {
    this.findOne(id);
    this.DBService.deleteTrack(id);
  }
}
