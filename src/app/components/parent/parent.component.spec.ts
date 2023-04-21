import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject } from 'rxjs';

import { ParentComponent } from './parent.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  const routerMock = {
    events: new Subject<RouterEvent>(),
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentComponent],
      imports: [
        MatProgressSpinnerModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Observable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to listPhotos when button is clicked', () => {
    const photosButton =
      fixture.nativeElement.querySelector('button:first-child');
    photosButton.click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to listFavoritePhotos when button is clicked', () => {
    const favoritesButton =
      fixture.nativeElement.querySelector('button:last-child');
    favoritesButton.click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['favorites']);
  });

  it('should set activeRoute to listPhotos on init when route is /', () => {
    const routerEvent = new NavigationEnd(1, '/', '/');
    routerMock.events.next(routerEvent);
    fixture.detectChanges();
    expect(component.activeRoute).toBe('listPhotos');
  });

  it('should set activeRoute to listFavoritePhotos on init when route is /favorites', () => {
    const routerEvent = new NavigationEnd(1, '/favorites', '/favorites');
    routerMock.events.next(routerEvent);
    fixture.detectChanges();
    expect(component.activeRoute).toBe('listFavoritePhotos');
  });

  it('should set activeRoute to null on init when route is not / or /favorites', () => {
    const routerEvent = new NavigationEnd(1, '/photos/123', '/photos/123');
    routerMock.events.next(routerEvent);
    fixture.detectChanges();
    expect(component.activeRoute).toBe(null);
  });
});
