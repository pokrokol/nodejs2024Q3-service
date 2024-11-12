import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from 'src/database/database.service';
import { Album } from './entities/album.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(private readonly DBService: Database) {}

  findAll(): Album[] {
    return this.DBService.getAlbums().map((album) =>
      plainToClass(Album, album),
    );
  }

  findOne(id: string): Album {
    const album = this.DBService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return plainToClass(Album, album);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = plainToClass(Album, createAlbumDto);
    this.DBService.addAlbum(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.DBService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    Object.assign(album, updateAlbumDto);
    this.DBService.updateAlbum(album);
    return plainToClass(Album, album);
  }

  remove(id: string): void {
    const album = this.DBService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.DBService.deleteAlbum(id);
  }
}
