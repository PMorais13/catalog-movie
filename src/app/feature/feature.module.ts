import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../core/components/header/header.module';
import { HomeModule } from './components/popular-movies/home.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { SelectedMovieModule } from './components/selected-movie/selected-movie.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HomeModule,
    SelectedMovieModule,
    MatProgressSpinnerModule,
    FeaturesRoutingModule
  ],
  declarations: [FeatureComponent],
  exports: [FeatureComponent]
})
export class FeatureModule {

}
