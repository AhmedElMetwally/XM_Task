import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-list-favorite-photos',
  templateUrl: './list-favorite-photos.component.html',
  styleUrls: ['./list-favorite-photos.component.scss'],
})
export class ListFavoritePhotosComponent {
  photos: Photo[] = [];

  constructor(
    private photoService: PhotoService,
    public router: Router,
  ) {}

  getPhotos() {
    const photos = this.photoService.getFavoritePhotos();
    this.photos.push(...photos);
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  navigateToViewFavoritePhoto(id: number) {
    this.router.navigate(['/photos', id]);
  }
}
