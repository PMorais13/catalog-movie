import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { Router } from '@angular/router';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  constructor(
    public favoritesService: FavoritesService,
    private storage: StorageService,
    private router: Router
  ) {}

  public selectMovie(id: number): void {
    this.storage.setIdSelectedMovie = id;
    this.router.navigate([ActiveRoutes.SELECT]);
  }

  public remove(id: number): void {
    this.favoritesService.remove(id);
  }
}
