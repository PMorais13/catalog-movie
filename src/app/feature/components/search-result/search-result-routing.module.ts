import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchResultComponent } from './search-result.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SearchResultRoutingModule {}
