import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieCollectionComponent } from './movie-collection.component';

const routes: Routes = [
  {
    path: '',
    component: MovieCollectionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MovieCollectionRoutingModule {}
