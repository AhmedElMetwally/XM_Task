import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss']
})
export class ListPhotosComponent implements OnInit {
  photos: Photo[] = [];
  isLoading = true;

  constructor(
    private photoService: PhotoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPhotos();
  }

  async getPhotos(): Promise<void> {
    this.isLoading = true;

    try {
      const photos = await this.photoService.getPhotos();
      this.photos.push(...photos);
    } catch (error) {
      console.error(error);
      this.showSnackBar('Failed to load photos');
    } finally {
      this.isLoading = false;
    }
  }

  addToFavorites(photo: Photo): void {
    this.photoService.addFavoritePhoto(photo);
    this.showSnackBar('Photo added to favorites!');
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}