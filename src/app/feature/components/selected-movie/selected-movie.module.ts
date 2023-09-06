import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { SelectedMovieComponent } from './selected-movie.component';
import { SelectedMovieRoutingModule } from './selected-movie.routing.module';
import { MovieSpotlightModule } from 'src/app/shared/movie-spotlight/movie-spotlight.module';


@NgModule({
  imports: [
    CommonModule,
    SelectedMovieRoutingModule,
    MovieSpotlightModule,
    MatCardModule
  ],
  declarations: [SelectedMovieComponent]
})
export class SelectedMovieModule { }
