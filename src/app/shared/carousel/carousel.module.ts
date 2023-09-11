import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './carousel.component';


@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
  ],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselComponentModule { }