import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../core/components/header/header.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FeaturesRoutingModule,
  ],
  declarations: [FeatureComponent],
  exports: [FeatureComponent]
})
export class FeatureModule {

}
