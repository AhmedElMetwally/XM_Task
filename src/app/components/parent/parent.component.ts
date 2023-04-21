import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  activeRoute: 'listPhotos' | 'listFavoritePhotos' | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = null;
        if (event.url == '/') {
          this.activeRoute = 'listPhotos';
        }
        if (event.url == '/favorites') {
          this.activeRoute = 'listFavoritePhotos';
        }
      });
  }

  navigateToListPhotos() {
    this.router.navigate(['/']);
    this.activeRoute = 'listPhotos';
  }

  navigateToListFavoritePhotos() {
    this.router.navigate(['favorites']);
    this.activeRoute = 'listFavoritePhotos';
  }

  ngOnInit(): void {}
}
