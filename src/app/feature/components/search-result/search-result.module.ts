import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { SearchResultRoutingModule } from './search-result-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule
  ],
  declarations: [SearchResultComponent]
})
export class SearchResultModule { }
