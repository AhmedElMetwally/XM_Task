import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from './../../services/photo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss'],
})
export class ListPhotosComponent implements OnInit {
  photos: Photo[] = [];
  isLoading: boolean = true;

  constructor(
    private photoService: PhotoService,
    private snackBar: MatSnackBar
  ) {}

  getPhotos() {
    this.isLoading = true;
    this.photoService.getPhotos().then((photos) => {
      this.photos.push(...photos);
      this.isLoading = false;
    });
  }

  addToFavorites(photo: Photo) {
    this.photoService.addFavoritePhoto(photo);
    this.showSnackBar('Photo added to favorites!');
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.getPhotos();
  }
}
