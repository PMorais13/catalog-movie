import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/popular-movies/home.component';
import { ActiveRoutes } from '../enums/routes.enum';
import { SelectedMovieComponent } from './components/selected-movie/selected-movie.component';
import { MovieCollectionComponent } from './components/movie-collection/movie-collection.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: ActiveRoutes.HOME,
          component: HomeComponent,
      },
      {
          path: ActiveRoutes.SELECT,
          component: SelectedMovieComponent,
      },
      {
          path: ActiveRoutes.COLLECTION,
          component: MovieCollectionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
