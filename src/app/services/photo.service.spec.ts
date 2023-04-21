import { PhotoService } from './photo.service';
import { Photo } from '../models/photo.model';

describe('PhotoService', () => {
  let service: PhotoService;
  let localStore: any;

  beforeEach(() => {
    localStore = {};
    service = new PhotoService();

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a random id within the limit', () => {
    const limit = 10;
    const id = service['genId'](limit);
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(limit);
  });

  it('should return an array of photos', async () => {
    const limit = 5;
    const photos = await service.getPhotos(limit);
    expect(photos).toBeDefined();
    photos.forEach((photo) => {
      expect(photo.url).toContain('https://picsum.photos/id/');
      expect(photo.id).toBeDefined();
    });
  });

  it('should add a photo to favorites', () => {
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/1/200/300' };
    service.addFavoritePhoto(photo);
    const favoritePhotos = service.getFavoritePhotos();
    expect(favoritePhotos.find((p) => p.id === photo.id)).toBeTruthy();
  });

  it('should not add a photo to favorites if it already exists', () => {
    const firstLen = service.getFavoritePhotos().length;
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/1/200/300' };
    service.addFavoritePhoto(photo);
    service.addFavoritePhoto(photo);
    const secendLen = service.getFavoritePhotos().length;
    expect(secendLen).toBe(firstLen + 1);
  });

  it('should remove a photo from favorites', () => {
    const firstLen = service.getFavoritePhotos().length;
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/1/200/300' };
    service.addFavoritePhoto(photo);
    service.removeFavoritePhoto(photo);
    const secendLen = service.getFavoritePhotos().length;
    expect(firstLen).toBe(secendLen);
  });

  it('should return true if a photo is in favorites', () => {
    const photo: Photo = { id: 123, url: 'https://picsum.photos/id/1/200/300' };
    service.addFavoritePhoto(photo);
    const isFavorite = service.isFavorite(photo);
    expect(isFavorite).toBe(true);
  });

  it('should return false if a photo is not in favorites', () => {
    const photo: Photo = {
      id: 1230,
      url: 'https://picsum.photos/id/1/200/300',
    };
    const isFavorite = service.isFavorite(photo);
    expect(isFavorite).toBe(false);
  });

  it('should return an array of favorite photos', () => {
    const photo1: Photo = {
      id: 123,
      url: 'https://picsum.photos/id/1/200/300',
    };
    const photo2: Photo = {
      id: 456,
      url: 'https://picsum.photos/id/2/200/300',
    };
    service.addFavoritePhoto(photo1);
    service.addFavoritePhoto(photo2);
    const favoritePhotos = service.getFavoritePhotos();
    expect(favoritePhotos).toContain(photo1);
    expect(favoritePhotos).toContain(photo2);
  });

  it('should get a favorite photo by id', () => {
    const photo1: Photo = {
      id: 123,
      url: 'https://picsum.photos/id/1/200/300',
    };
    const photo2: Photo = {
      id: 456,
      url: 'https://picsum.photos/id/2/200/300',
    };
    service.addFavoritePhoto(photo1);
    service.addFavoritePhoto(photo2);
    const favoritePhoto = service.getFavoritePhotoById(photo1.id);
    expect(favoritePhoto).toEqual(photo1);
  });

  it('should return null if a favorite photo is not found', () => {
    const favoritePhoto = service.getFavoritePhotoById(12300);
    expect(favoritePhoto).toBeNull();
  });
});
