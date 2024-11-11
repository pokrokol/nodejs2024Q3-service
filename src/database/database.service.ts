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
  // General utility function to find item index by ID
  private findIndexById<T extends { id: string }>(
    items: T[],
    id: string,
  ): number {
    return items.findIndex((item) => item.id === id);
  }

  // General method to update item by ID
  private updateItem<T extends { id: string }>(items: T[], item: T) {
    const index = this.findIndexById(items, item.id);
    if (index !== -1) items[index] = item;
  }

  // General method to delete item by ID
  private deleteItem<T extends { id: string }>(items: T[], id: string) {
    const index = this.findIndexById(items, id);
    if (index !== -1) items.splice(index, 1);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(user: User) {
    this.updateItem(this.users, user);
  }

  deleteUser(id: string) {
    this.deleteItem(this.users, id);
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(track: Track) {
    this.updateItem(this.tracks, track);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((t) => t.id !== id);
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track !== id,
    );
  }
  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  updateArtist(artist: Artist) {
    this.updateItem(this.artists, artist);
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);

    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist !== id,
    );
  }

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbum(album: Album) {
    this.updateItem(this.albums, album);
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);

    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.favorites.albums = this.favorites.albums.filter(
      (album) => album !== id,
    );
  }
}
