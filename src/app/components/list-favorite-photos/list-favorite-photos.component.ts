import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-list-favorite-photos',
  templateUrl: './list-favorite-photos.component.html',
  styleUrls: ['./list-favorite-photos.component.scss']
})
export class ListFavoritePhotosComponent implements OnInit {
  photos: Photo[] = [];

  constructor(
    private photoService: PhotoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFavoritePhotos();
  }

  getFavoritePhotos(): void {
    this.photos = this.photoService.getFavoritePhotos();
  }

  navigateToViewFavoritePhoto(id: number): void {
    this.router.navigate(['/photos', id]);
  }
}