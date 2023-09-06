import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  declarations: [HomeComponent, CarouselComponent],
  exports: [HomeComponent]
})
export class HomeModule { }