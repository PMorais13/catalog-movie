import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { MostPopular } from 'src/app/interfaces/most-popular.interface';
import { AllMovies } from 'src/app/interfaces/all-movies.interface';
import { endpoint } from "src/app/core/settings/url";
import { InfoCaroucel } from 'src/app/interfaces/info-carousel.interface';
import { StorageService } from '../../services/storage/storage.service';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Subscription, skip, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  public mostPopular!: MostPopular;
  public allPopular: Array<InfoCaroucel> = [];
  public backgroundImage = '';
  public backgroundImageInternal = '';
  public subscriptionLanguage!: Subscription;

  /**
   * 
   * @param tmbdService serviço intermidiário das chamadas para o Tmdb
   */
  constructor(private readonly tmbdService: TmbdService,
    private readonly storageService: StorageService) {
    super();
  }

  /**
   * inicia o componente fazendo a chamada para recuperar a lista de filmes populares
   */
  ngOnInit() {
    this.subscriptionLanguage?.unsubscribe()
    this.allPopular = [];
    this.getListPopularMovies();
    this.getListTopRated();
    this.observableLanguage()
  }

  /**
   * recupera a lista de filmes populares
   */
  private getListPopularMovies(): void {
    const url = endpoint.popular;
    this.tmbdService.getListMovies(url).pipe(take(1)).subscribe((data: AllMovies) => {
      const index = this.storageService.getIndexMostPopularMovie ?? Math.round(Math.random() * (19 - 0) + 0);
      this.storageService.setIndexMostPopularMovie = index;
      const result = data.results[index];
      this.mostPopular = {
        imgUrl: 'https://image.tmdb.org/t/p/w500/' + result.backdrop_path,
        title: result.title,
        description: result.overview.length ? result.overview : 'Descrição não encontrada',
        rating: result.vote_average,
      }
      this.backgroundImage = `linear-gradient(to top, rgb(59, 59, 59), rgba(67, 9, 173, 0.1)),url('${this.mostPopular.imgUrl}')`;
      this.backgroundImageInternal = `url('${this.mostPopular.imgUrl}')`;

      const popular = {
        title: 'Mais populares!',
        results: data.results
      }
      this.allPopular.push(popular)
    })
  }

  /**
   * recupera a lista de filmes mais votados
   */
  private getListTopRated(): void {
    const url = endpoint.topRated;
    this.tmbdService.getListMovies(url).pipe(take(1)).subscribe((data: AllMovies) => {
      const topRated = {
        title: 'Mais votados!',
        results: data.results
      }
      this.allPopular.push(topRated)
    })
  }

  /**
   * observa as mudanças no estado do idioma
   */
  private observableLanguage(): void {
    this.subscriptionLanguage = this.storageService.getLanguage.pipe(skip(1), takeUntil(this.onDestroy)).subscribe((data) => {
      this.ngOnInit();
    })
  }
}
