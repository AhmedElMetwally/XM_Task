import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly storageKey = 'favoritePhotos';

  constructor() {}

  private genId(limit: number): number {
    return Math.floor(Math.random() * limit);
  }

  async getPhotos(limit = 10): Promise<Photo[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const photos: Photo[] = [];
        for (let i = 0; i < limit; i++) {
          const url = `https://picsum.photos/id/${this.genId(50)}/200/300`;
          const id = this.genId(100000);
          photos.push({ url, id });
        }
        resolve(photos);
      }, 300);
    });
  }

  addFavoritePhoto(photo: Photo): void {
    const favoritePhotos = this.getFavoritePhotos();
    if (!favoritePhotos.some(p => p.id === photo.id)) {
      favoritePhotos.push(photo);
      this.saveFavoritePhotos(favoritePhotos);
    }
  }

  removeFavoritePhoto(photo: Photo): void {
    const favoritePhotos = this.getFavoritePhotos();
    const index = favoritePhotos.findIndex(p => p.id === photo.id);
    if (index !== -1) {
      favoritePhotos.splice(index, 1);
      this.saveFavoritePhotos(favoritePhotos);
    }
  }

  isFavorite(photo: Photo): boolean {
    return this.getFavoritePhotos().some(p => p.id === photo.id);
  }

  getFavoritePhotos(): Photo[] {
    const favoritePhotosString = localStorage.getItem(this.storageKey);
    return favoritePhotosString ? JSON.parse(favoritePhotosString) : [];
  }

  saveFavoritePhotos(favoritePhotos: Photo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favoritePhotos));
  }

  getFavoritePhotoById(id: number): Photo | null {
    const favoritePhotos = this.getFavoritePhotos();
    return favoritePhotos.find(p => p.id === id) || null;
  }
}