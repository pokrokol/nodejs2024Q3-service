import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Database } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly DBService: Database) {}

  findAll() {
    return this.DBService.getFavorites();
  }

  addArtistToFavorites(id: string) {
    if (!this.DBService.isExistFavorite(id, 'artists')) {
      throw new UnprocessableEntityException('Artist id does not exist');
    }
    this.DBService.addFavorite(id, 'artists');
  }

  addAlbumToFavorites(id: string) {
    if (!this.DBService.isExistFavorite(id, 'albums')) {
      throw new UnprocessableEntityException('Album id does not exist');
    }
    this.DBService.addFavorite(id, 'albums');
  }

  addTrackToFavorites(id: string) {
    if (!this.DBService.isExistFavorite(id, 'tracks')) {
      throw new UnprocessableEntityException('Track id does not exist');
    }
    this.DBService.addFavorite(id, 'tracks');
  }

  removeArtistFromFavorites(id: string) {
    this.DBService.removeFavorite(id, 'artists');
  }

  removeAlbumFromFavorites(id: string) {
    this.DBService.removeFavorite(id, 'albums');
  }

  removeTrackFromFavorites(id: string) {
    this.DBService.removeFavorite(id, 'tracks');
  }
}
