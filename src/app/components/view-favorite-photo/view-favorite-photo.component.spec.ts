import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ViewFavoritePhotoComponent } from './view-favorite-photo.component';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo.model';

describe('ViewFavoritePhotoComponent', () => {
  let component: ViewFavoritePhotoComponent;
  let fixture: ComponentFixture<ViewFavoritePhotoComponent>;
  let photoServiceSpy: jasmine.SpyObj<PhotoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PhotoService', [
      'getFavoritePhotoById',
      'removeFavoritePhoto',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ViewFavoritePhotoComponent],
      providers: [
        { provide: PhotoService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Subject(),
          },
        },
        { provide: Router, useValue: routerSpyObj },
      ],
    });

    photoServiceSpy = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(ViewFavoritePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the favorite photo by id', () => {
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/123/200/300' };
    photoServiceSpy.getFavoritePhotoById.and.returnValue(photo);

    const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
    (route.params as Subject<any>).next({ id: 123 });

    expect(photoServiceSpy.getFavoritePhotoById).toHaveBeenCalledWith(123);
    expect(component.photo).toBe(photo);
  });

  it('should navigate to view favorite photos after removing favorite photo', () => {
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/123/200/300' };
    photoServiceSpy.getFavoritePhotoById.and.returnValue(photo);

    component.photo = photo;
    component.removeFavoritePhoto();

    expect(photoServiceSpy.removeFavoritePhoto).toHaveBeenCalledWith(photo);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});