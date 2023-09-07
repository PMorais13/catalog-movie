import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponentModule } from 'src/app/shared/carousel/carousel.module';
import { MovieSpotlightModule } from 'src/app/shared/movie-spotlight/movie-spotlight.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    CarouselComponentModule,
    MovieSpotlightModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }