import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from './entities/track.entity'; // Ensure this import exists and is correct
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }
  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      this.handleNotFoundError(error, 'Track not found');
    }
  }

  private handleNotFoundError(error: any, message: string): never {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException(message);
    }
    throw error;
  }
}
