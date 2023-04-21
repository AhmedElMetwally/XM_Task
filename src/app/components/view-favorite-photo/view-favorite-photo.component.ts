import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-view-favorite-photo',
  templateUrl: './view-favorite-photo.component.html',
  styleUrls: ['./view-favorite-photo.component.scss']
})
export class ViewFavoritePhotoComponent implements OnInit {
  photo: Photo | null = null;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.getFavoritePhotoById(id);
    });
  }

  getFavoritePhotoById(id: number): void {
    this.photo = this.photoService.getFavoritePhotoById(id) ?? null;
  }

  removeFavoritePhoto(): void {
    if (this.photo) {
      this.photoService.removeFavoritePhoto(this.photo);
      this.navigateToViewFavoritePhotos();
    }
  }

  navigateToViewFavoritePhotos(): void {
    this.router.navigate(['/favorites']);
  }
}