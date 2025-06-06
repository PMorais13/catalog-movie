import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { SearchResultRoutingModule } from './search-result-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [SearchResultComponent]
})
export class SearchResultModule { }
