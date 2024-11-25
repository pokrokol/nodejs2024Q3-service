import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all albums
  async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums.map((album) => this.transformToAlbumEntity(album));
  }

  // Fetch a single album by ID
  async findOne(id: string): Promise<Album> {
    const album = await this.findAlbumOrThrow(id);
    return this.transformToAlbumEntity(album);
  }

  // Create a new album
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return this.transformToAlbumEntity(album);
  }

  // Update an existing album
  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findAlbumOrThrow(id); // Ensure album exists
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
    return this.transformToAlbumEntity(updatedAlbum);
  }

  // Delete an album
  async remove(id: string): Promise<void> {
    await this.findAlbumOrThrow(id); // Ensure album exists
    await this.prisma.album.delete({ where: { id } });
  }

  // Transform database record to Album entity
  private transformToAlbumEntity(data: any): Album {
    return plainToClass(Album, data);
  }

  // Helper method to find an album or throw an exception
  private async findAlbumOrThrow(id: string): Promise<any> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
