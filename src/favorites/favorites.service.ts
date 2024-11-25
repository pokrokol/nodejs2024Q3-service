import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, type: 'artist' | 'album' | 'track') {
    await this.ensureEntityExists(id, type);

    const favorite = await this.prisma.favorite.findFirst();
    if (favorite) {
      return this.updateFavorite(favorite.favoriteId, type, id, favorite);
    }
    return this.createFavoriteEntry(type, id);
  }

  private async ensureEntityExists(
    id: string,
    type: 'artist' | 'album' | 'track',
  ) {
    let entity;
    switch (type) {
      case 'artist':
        entity = await this.prisma.artist.findUnique({ where: { id } });
        break;
      case 'album':
        entity = await this.prisma.album.findUnique({ where: { id } });
        break;
      case 'track':
        entity = await this.prisma.track.findUnique({ where: { id } });
        break;
      default:
        throw new HttpException(
          `${type} is not a valid type`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }

    if (!entity) {
      throw new HttpException(
        `${type} with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private updateFavorite(
    favoriteId: string,
    type: string,
    id: string,
    favorite: any,
  ) {
    const updateData = { [type + 's']: { set: [...favorite[type + 's'], id] } };
    return this.prisma.favorite.update({
      where: { favoriteId },
      data: updateData,
    });
  }

  private createFavoriteEntry(type: string, id: string) {
    const createData = {
      artists: [],
      albums: [],
      tracks: [],
      [type + 's']: [id],
    };
    return this.prisma.favorite.create({ data: createData });
  }

  async findAll() {
    const favorite = await this.prisma.favorite.findFirst();
    if (!favorite) {
      return { artists: [], albums: [], tracks: [] };
    }

    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favorite.artists } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favorite.albums } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favorite.tracks } },
    });

    return { artists, albums, tracks };
  }

  async removeType(id: string, type: 'artist' | 'album' | 'track') {
    const favorite = await this.prisma.favorite.findFirst();
    if (!favorite || !favorite[type + 's'].includes(id)) {
      throw new NotFoundException(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } with ID ${id} not found in favorites`,
      );
    }

    const updateData = {
      [type + 's']: {
        set: favorite[type + 's'].filter((itemId) => itemId !== id),
      },
    };
    return this.prisma.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: updateData,
    });
  }
}
