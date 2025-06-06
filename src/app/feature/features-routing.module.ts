import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveRoutes } from '../enums/routes.enum';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
          path: ActiveRoutes.HOME,
          loadChildren: () => import ('./components/popular-movies/home.module').then(m => m.HomeModule)
      },
      {
          path: ActiveRoutes.SELECT,
          loadChildren: () => import ('./components/selected-movie/selected-movie.module').then(m => m.SelectedMovieModule)
      },
      {
          path: ActiveRoutes.COLLECTION,
          loadChildren: () => import ('./components/movie-collection/movie-collection.module').then(m => m.MovieCollectionModule)
      },
      {
          path: ActiveRoutes.FAVORITES,
          loadChildren: () => import ('./components/favorites/favorites.module').then(m => m.FavoritesModule)
      },
      {
        path: ActiveRoutes.SEARCH,
        loadChildren: () => import ('./components/search-result/search-result.module').then(m => m.SearchResultModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
