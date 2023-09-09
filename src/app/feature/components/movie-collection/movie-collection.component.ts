import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { InfoCaroucel } from 'src/app/interfaces/info-carousel.interface';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { take } from 'rxjs';
import { GENRES } from 'src/app/shared/consts/genres.const';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss']
})
export class MovieCollectionComponent implements OnInit {
  public allCollection: Array<InfoCaroucel> = [];
  public title: string;
  public isLoaded = false;

  constructor(private readonly storageService: StorageService, private readonly tmbdService:TmbdService) {
    this.title = this.storageService.getTypeCollection === TypeCollection.MOVIE ? 'filmes' : 'séries';
  }

  /**
   * invoca as chamadas para o back na inicialização do componente
   */
  public ngOnInit() {
    this.getMoviesWithGenres();
  }

  private getMoviesWithGenres(): void {
    GENRES.forEach((genre, index) => {
      this.tmbdService.getMoviesWithGenres(genre.id.toString()).pipe(take(1)).subscribe((data: any)=> {
        if(!data.results.length) return;
        this.allCollection.push(
          {
            title: genre.name,
            results: data.results,
          }
        )
        if (index + 1 === GENRES.length) {
          this.isLoaded = true;
        }
      });
    });
  }
}
