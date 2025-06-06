import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, FavoritesRoutingModule, MatButtonModule, MatIconModule],
  declarations: [FavoritesComponent]
})
export class FavoritesModule {}
