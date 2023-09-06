import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SelectedMovieComponent } from './selected-movie.component';

const routes: Routes = [
  {
    path: '',
    component: SelectedMovieComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SelectedMovieRoutingModule {}
