import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../core/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule
  ],
  declarations: [FeatureComponent],
  exports: [FeatureComponent]
})
export class FeatureModule { }
