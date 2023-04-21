import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/photo.service';

import { ListPhotosComponent } from './list-photos.component';

describe('ListPhotosComponent', () => {
  let component: ListPhotosComponent;
  let fixture: ComponentFixture<ListPhotosComponent>;
  let photoServiceSpy: jasmine.SpyObj<PhotoService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PhotoService', [
      'getPhotos',
      'addFavoritePhoto',
    ]);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ListPhotosComponent],
      imports: [MatSnackBarModule, MatProgressSpinnerModule],
      providers: [
        { provide: PhotoService, useValue: spy },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
      ],
    });

    photoServiceSpy = TestBed.inject(
      PhotoService
    ) as jasmine.SpyObj<PhotoService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(ListPhotosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get photos on initialization', (done) => {
    const photos: Photo[] = [
      { id: 1, url: 'https://picsum.photos/id/1/200/300' },
      { id: 2, url: 'https://picsum.photos/id/2/200/300' },
    ];
    photoServiceSpy.getPhotos.and.resolveTo(photos);

    fixture.detectChanges();

    setTimeout(() => {
      expect(photoServiceSpy.getPhotos).toHaveBeenCalled();
      expect(component.photos).toEqual(photos);
      expect(component.isLoading).toBeFalse();
      done();
    }, 500);
  });

  it('should add photo to favorites and show snackbar', () => {
    const photo: Photo = { id: 1, url: 'https://picsum.photos/id/1/200/300' };
    photoServiceSpy.addFavoritePhoto.and.stub();

    component.addToFavorites(photo);

    expect(photoServiceSpy.addFavoritePhoto).toHaveBeenCalledWith(photo);
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Photo added to favorites!',
      'Close',
      {
        duration: 2000,
        verticalPosition: 'top',
      }
    );
  });
});
