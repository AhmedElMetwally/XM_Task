import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  activeRoute: 'listPhotos' | 'listFavoritePhotos' | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.activeRoute = null;

      if (event.url === '/') {
        this.activeRoute = 'listPhotos';
      } else if (event.url === '/favorites') {
        this.activeRoute = 'listFavoritePhotos';
      }
    });
  }

  navigateToListPhotos(): void {
    this.router.navigate(['/']);
    this.activeRoute = 'listPhotos';
  }

  navigateToListFavoritePhotos(): void {
    this.router.navigate(['favorites']);
    this.activeRoute = 'listFavoritePhotos';
  }
}