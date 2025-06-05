import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { InfoCarousel } from 'src/app/interfaces/info-carousel.interface';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { Observable, forkJoin, take } from 'rxjs';
import { GENRES } from 'src/app/shared/consts/genres.const';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';
import { LoaderService } from 'src/app/core/components/loader/services/loader.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss'],
})
export class MovieCollectionComponent implements OnInit {
  public allCollection: Array<InfoCarousel> = [];
  public title: string;
  public genrers = new FormControl(['']);
  public genrerList: Array<string> = [];
  public isLoaded = false;
  private isMovie: boolean;
  private collectionOrigin: Array<InfoCarousel> = [];

  constructor(
    private readonly storageService: StorageService,
    private readonly tmbdService: TmbdService,
    private readonly loaderService: LoaderService
  ) {
    this.isMovie =
      this.storageService.getTypeCollection === TypeCollection.MOVIE;
    this.title = this.isMovie ? 'filmes' : 'séries';
    GENRES.map((genre) => {
      this.genrerList.push(genre.name);
    });
  }

  /**
   * invoca as chamadas para o back na inicialização do componente
   */
  public ngOnInit() {
    this.cachedList();
    this.controlFilter();
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
    this.collectionOrigin = this.allCollection;
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

  /**
   * controla o filtro de generos
   */
  private controlFilter(): void {
    this.genrers.valueChanges.pipe().subscribe((data: Array<string> | null) => {
      if (!data?.length) {
        this.allCollection = this.collectionOrigin;

        return;
      }
      this.allCollection = [];
      this.allCollection = this.collectionOrigin.filter((item) => data.includes(item.title));
    })
  }
}
