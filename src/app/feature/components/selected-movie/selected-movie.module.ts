import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { SelectedMovieComponent } from './selected-movie.component';
import { SelectedMovieRoutingModule } from './selected-movie.routing.module';
import { MovieSpotlightModule } from 'src/app/shared/movie-spotlight/movie-spotlight.module';


@NgModule({
  imports: [
    CommonModule,
    SelectedMovieRoutingModule,
    MovieSpotlightModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [SelectedMovieComponent]
})
export class SelectedMovieModule { }
