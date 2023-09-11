import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCollectionComponent } from './movie-collection.component';
import { MovieCollectionRoutingModule } from './movie-collection-routing.module';
import { CarouselComponentModule } from 'src/app/shared/carousel/carousel.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MovieCollectionRoutingModule,
    CarouselComponentModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [MovieCollectionComponent],
})
export class MovieCollectionModule { }
