import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { StorageService } from '../../services/storage/storage.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ActiveRoutes } from 'src/app/enums/routes.enum';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public results: any = [];
  public theme: ThemePalette;
  public skeletons = Array.from({ length: 8 });

  constructor(
    private readonly tmbdService: TmbdService,
    private readonly storageService: StorageService,
    public readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) { }

  /**
   * recupera a lista da pesquisa
   */
  public ngOnInit(): void {
    this.storageService.setPagination = 1;
    this.getResults();
  }

  public handlePageEvent(event: PageEvent): void {
    this.storageService.setPagination = event.pageIndex + 1;
    this.getResults();
  }

  /**
   * ouve o clique na imagem e seleciona o filme
   */
  public selectMovie(id: number): void {
    this.storageService.setIdSelectedMovie = id;
    void this.router.navigate([ActiveRoutes.SELECT]);
  }

  public toggleFavorite(movie: any): void {
    this.favoritesService.toggle(movie);
  }

  /**
   * recupera a pesquisa do user e faz a chamada para a api
   */
  private getResults(): void {
    const search = this.storageService.getSearch;
    this.tmbdService.getMovie(search).pipe(take(1)).subscribe((data: any) => {
      console.log(data);
      this.results = data;
    })
  }
}
