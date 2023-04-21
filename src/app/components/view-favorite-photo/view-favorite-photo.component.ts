import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-view-favorite-photo',
  templateUrl: './view-favorite-photo.component.html',
  styleUrls: ['./view-favorite-photo.component.scss'],
})
export class ViewFavoritePhotoComponent {
  photo: Photo | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getFavoritePhotoById();
    });
  }

  getFavoritePhotoById() {
    const photo = this.photoService.getFavoritePhotoById(this.id);
    this.photo = photo || null;
  }

  removeFavoritePhoto() {
    if (this.photo) {
      this.photoService.removeFavoritePhoto(this.photo);
      this.navigateToViewFavoritePhotos();
    }
  }

  navigateToViewFavoritePhotos() {
    this.router.navigate(['/favorites']);
  }
}
