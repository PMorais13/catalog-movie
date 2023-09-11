import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { SearchResultRoutingModule } from './search-result-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    MatPaginatorModule
  ],
  declarations: [SearchResultComponent]
})
export class SearchResultModule { }
