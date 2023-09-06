import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSpotlightComponent } from './movie-spotlight.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MovieSpotlightComponent
  ],
  declarations: [MovieSpotlightComponent]
})
export class MovieSpotlightModule { }
