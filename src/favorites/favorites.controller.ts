import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // Retrieve all favorite items
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  // Add an artist to favorites
  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  // Add an album to favorites
  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  // Add a track to favorites
  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }
}
