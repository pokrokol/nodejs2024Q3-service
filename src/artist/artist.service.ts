import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';
import { Database } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly DBService: Database) {}

  findAll(): Artist[] {
    return this.DBService.getArtists().map((artist) =>
      plainToClass(Artist, artist),
    );
  }

  findOne(id: string): Artist {
    const artist = this.DBService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return plainToClass(Artist, artist);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.DBService.addArtist(artist);
    return plainToClass(Artist, artist);
  }

  update(id: string, updArtistDto: UpdateArtistDto): Artist {
    const artist = this.DBService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.name = updArtistDto.name;
    artist.grammy = updArtistDto.grammy;
    this.DBService.updateArtist(artist);
    return plainToClass(Artist, artist);
  }

  remove(id: string): void {
    const artist = this.DBService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.DBService.deleteArtist(id);
  }
}
