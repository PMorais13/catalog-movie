import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { AllMovies } from 'src/app/interfaces/all-movies.interface';
import { endpoint } from 'src/app/core/settings/url';
import { InfoCarousel } from 'src/app/interfaces/info-carousel.interface';
import { StorageService } from '../../services/storage/storage.service';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import {
  Observable,
  Subscription,
  delay,
  forkJoin,
  interval,
  skip,
  take,
  takeUntil
} from 'rxjs';
import { SpotlighInfos } from 'src/app/interfaces/spotligh-info.interface';
import {
  formatUrlImg,
  formatUrlImgInternal,
} from 'src/app/shared/formatters/formatters.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public allPopular: Array<InfoCarousel> = [];
  public subscriptionLanguage!: Subscription;
  public spotlighInfos!: SpotlighInfos;

  /**
   *
   * @param tmbdService serviço intermidiário das chamadas para o Tmdb
   */
  constructor(
    private readonly tmbdService: TmbdService,
    private readonly storageService: StorageService
  ) {
    super();
  }

  /**
   * inicia o componente fazendo a chamada para recuperar a lista de filmes populares
   */
  public ngOnInit() {
    this.subscriptionLanguage?.unsubscribe();
    this.allPopular = [];
    this.getRequests();
    this.observableLanguage();
  }

  /**
   * recupera a lista de filmes populares
   */
  private getListPopularMovies(): Observable<any> {
    const url = endpoint.popular;
    return this.tmbdService.getListMovies(url).pipe(delay(1000));
  }

  /**
   * recupera a lista de filmes mais votados
   */
  private getListTopRated(): Observable<any> {
    const url = endpoint.topRated;
    return this.tmbdService.getListMovies(url);
  }

  /**
   * observa as mudanças no estado do idioma
   */
  private observableLanguage(): void {
    this.subscriptionLanguage = this.storageService.getLanguage
      .pipe(skip(1), takeUntil(this.onDestroy))
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  private getRequests(): void {
    const requestsFirstPage = this.storageService.getRequestFirstPage;
    if (requestsFirstPage.length) {
      this.formatTopRated(requestsFirstPage[0]);
      this.formatInfoCarousel(requestsFirstPage[1]);
    } else {
      forkJoin([this.getListPopularMovies(), this.getListTopRated()]).pipe(take(1)).subscribe(
        (data) => {
          if (requestsFirstPage.length) {
            this.formatTopRated(requestsFirstPage[0]);
            this.formatInfoCarousel(requestsFirstPage[1]);
          } else {
            this.formatTopRated(data[0]);
            this.formatInfoCarousel(data[1]);
            this.storageService.setRequestFirstPage = data;
          }
        }
      );
    }
  }

  /**
   * formata as informações que serão enviadas ao carousel
   */
  private formatInfoCarousel(data: AllMovies): void {
    const index =
      this.storageService.getIndexMostPopularMovie ??
      Math.round(Math.random() * (19 - 0) + 0);
    this.storageService.setIndexMostPopularMovie = index;
    const result = data.results[index];
    const mostPopular = {
      imgUrl: result.backdrop_path
        ? 'https://image.tmdb.org/t/p/w500/' + result.backdrop_path
        : './../../../assets/img/not-image.png',
      title: result.title ?? result.name,
      description: result.overview.length
        ? result.overview
        : 'Descrição não encontrada',
      rating: result.vote_average,
    };
    const backgroundImage = formatUrlImg(mostPopular.imgUrl);
    const backgroundImageInternal = formatUrlImgInternal(mostPopular.imgUrl);
    this.spotlighInfos = {
      backgroundImage,
      backgroundImageInternal,
      mostPopular,
    };
    this.allPopular.push({
      title: 'Mais populares!',
      results: data.results,
    })
  }

  private formatTopRated(data: AllMovies): void {
    const topRated = {
      title: 'Mais votados!',
      results: data.results,
    };
    this.allPopular.push(topRated);
  }
}
