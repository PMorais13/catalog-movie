import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../core/components/header/header.module';
import { HomeModule } from './components/popular-movies/home.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HomeModule,
    MatProgressSpinnerModule
  ],
  declarations: [FeatureComponent],
  exports: [FeatureComponent]
})
export class FeatureModule {

}
