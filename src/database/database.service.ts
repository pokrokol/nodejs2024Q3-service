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
}
