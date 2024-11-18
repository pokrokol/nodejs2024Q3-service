import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { plainToClass } from 'class-transformer';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all tracks
  async findAll(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => this.transformToTrackEntity(track));
  }

  // Fetch a single track by ID
  async findOne(id: string): Promise<Track> {
    const track = await this.findTrackOrThrow(id);
    return this.transformToTrackEntity(track);
  }

  // Create a new track
  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.create({
      data: { ...createTrackDto },
    });
    return this.transformToTrackEntity(track);
  }

  // Update an existing track
  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findTrackOrThrow(id); // Ensure track exists
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
    return this.transformToTrackEntity(updatedTrack);
  }

  // Delete a track
  async remove(id: string): Promise<void> {
    await this.findTrackOrThrow(id); // Ensure track exists
    await this.prisma.track.delete({ where: { id } });
  }

  // Transform database record to Track entity
  private transformToTrackEntity(data: any): Track {
    return plainToClass(Track, data);
  }

  // Helper method to find a track or throw an exception
  private async findTrackOrThrow(id: string): Promise<any> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }
}
