import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { InfoCaroucel } from 'src/app/interfaces/info-carousel.interface';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { Observable, finalize, forkJoin, take } from 'rxjs';
import { GENRES } from 'src/app/shared/consts/genres.const';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';
import { LoaderService } from 'src/app/core/components/loader/services/loader.service';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss'],
})
export class MovieCollectionComponent implements OnInit {
  public allCollection: Array<InfoCaroucel> = [];
  public title: string;
  public isLoaded = false;
  private isMovie: boolean;

  constructor(
    private readonly storageService: StorageService,
    private readonly tmbdService: TmbdService,
    private readonly loaderService: LoaderService
  ) {
    this.isMovie =
      this.storageService.getTypeCollection === TypeCollection.MOVIE;
    this.title = this.isMovie ? 'filmes' : 'séries';
  }

  /**
   * invoca as chamadas para o back na inicialização do componente
   */
  public ngOnInit() {
    this.cachedList();
  }

  private getMoviesWithGenres(): void {
    const requests: Array<Observable<any>> = GENRES.map((genre) => {
      return this.tmbdService.getMoviesWithGenres(genre.id.toString());
    });
    forkJoin(requests)
      .pipe(
        take(1),
      )
      .subscribe((data) => {
        this.isMovie
          ? (this.storageService.setMoviesCache = data)
          : (this.storageService.setSeriesCache = data);
        this.formatInfos(data);
      });
  }

  /**
   * formata as informações dos carroceis
   */
  private formatInfos(data: any): void {
    data.forEach((item: any, index: number) => {
      if (!item.results.length) return;
      this.allCollection.push({
        title: GENRES[index].name,
        results: item.results,
      });
      if (index + 1 === GENRES.length) {
        this.isLoaded = true;
      }
    });
  }

  /**
   * verifica se a lista de filmes está em cache, se estiver ele recupera do cache se não ele faz as requisições
   */
  private cachedList(): void {
    const cache = this.isMovie
      ? this.storageService.getMoviesCache
      : this.storageService.getSeriesCache;
    if (cache.length) {
      this.loaderService.loadStarted();
      setTimeout(() => {
        this.formatInfos(cache);
        this.loaderService.loadCompleted();
      }, 500);
    } else {
      this.getMoviesWithGenres();
    }
  }
}
