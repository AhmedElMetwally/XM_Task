import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFavoritePhotosComponent } from './components/list-favorite-photos/list-favorite-photos.component';
import { ListPhotosComponent } from './components/list-photos/list-photos.component';
import { ViewFavoritePhotoComponent } from './components/view-favorite-photo/view-favorite-photo.component';

const routes: Routes = [
  { path: '', component: ListPhotosComponent },
  { path: 'favorites', component: ListFavoritePhotosComponent },
  { path: 'photos/:id', component: ViewFavoritePhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
