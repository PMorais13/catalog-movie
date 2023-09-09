import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../core/components/header/header.module';
import { HomeModule } from './components/popular-movies/home.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { SelectedMovieModule } from './components/selected-movie/selected-movie.module';
import { MovieCollectionModule } from './components/movie-collection/movie-collection.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HomeModule,
    SelectedMovieModule,
    FeaturesRoutingModule,
    MovieCollectionModule,
  ],
  declarations: [FeatureComponent],
  exports: [FeatureComponent]
})
export class FeatureModule {

}
