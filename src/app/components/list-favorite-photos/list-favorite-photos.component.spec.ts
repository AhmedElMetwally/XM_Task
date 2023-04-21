import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/photo.service';

import { ListFavoritePhotosComponent } from './list-favorite-photos.component';

describe('ListFavoritePhotosComponent', () => {
  let component: ListFavoritePhotosComponent;
  let fixture: ComponentFixture<ListFavoritePhotosComponent>;
  let photoServiceSpy: jasmine.SpyObj<PhotoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PhotoService', ['getFavoritePhotos']);

    TestBed.configureTestingModule({
      declarations: [ListFavoritePhotosComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: PhotoService, useValue: spy }],
    });

    photoServiceSpy = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;

    fixture = TestBed.createComponent(ListFavoritePhotosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favorite photos on initialization', () => {
    const photos: Photo[] = [
      { id: 1, url: 'https://picsum.photos/id/1/200/300' },
      { id: 2, url: 'https://picsum.photos/id/2/200/300' },
    ];
    photoServiceSpy.getFavoritePhotos.and.returnValue(photos);

    fixture.detectChanges();

    expect(photoServiceSpy.getFavoritePhotos).toHaveBeenCalled();
    expect(component.photos).toEqual(photos);
  });

  it('should navigate to view favorite photo', () => {
    const navigateSpy = spyOn(component.router, 'navigate');
    const id = 1;

    component.navigateToViewFavoritePhoto(id);

    expect(navigateSpy).toHaveBeenCalledWith(['/photos', id]);
  });
});