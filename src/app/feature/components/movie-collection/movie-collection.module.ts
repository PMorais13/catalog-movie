import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCollectionComponent } from './movie-collection.component';
import { MovieCollectionRoutingModule } from './movie-collection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MovieCollectionRoutingModule
  ],
  declarations: [MovieCollectionComponent]
})
export class MovieCollectionModule { }
