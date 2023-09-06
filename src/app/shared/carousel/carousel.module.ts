import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './carousel.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselComponentModule { }