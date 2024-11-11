import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { Artist } from './interfaces/artist.interface';
import { Favorites } from './interfaces/favorites.interface';
import { Track } from './interfaces/track.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class Database {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
