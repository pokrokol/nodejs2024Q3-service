import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return plainToClass(Artist, artist);
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async update(id: string, updArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updArtistDto },
    });
    return plainToClass(Artist, updatedArtist);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    await this.prisma.artist.delete({ where: { id } });
  }
}
