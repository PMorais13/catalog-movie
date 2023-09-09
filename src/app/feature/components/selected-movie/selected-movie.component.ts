import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { SpotlighInfos } from 'src/app/interfaces/spotligh-info.interface';
import { formatUrlImg, formatUrlImgInternal } from 'src/app/shared/formatters/formatters.const';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-selected-movie',
  templateUrl: './selected-movie.component.html',
  styleUrls: ['./selected-movie.component.scss']
})
export class SelectedMovieComponent implements OnInit {
  public spotlighInfos!: SpotlighInfos;
  public infoMovie!: any;

  constructor(private readonly tmbdService: TmbdService, private readonly storageService: StorageService) {}

  /**
   * faz a chamada para o filme selecionado
   */
  public ngOnInit(): void {
    this.getSelectedInfoMovie()
  }

  /**
   * recupera as informações do filme selecionado
   */
  public getSelectedInfoMovie(): void {
    const id = this.storageService.getIdSelectedMovie
    this.tmbdService.getIdMovie(id).subscribe((data: any)=> {
      this.infoMovie = data;
      const infosMovie = {
        title: data.title ?? data.name,
        description: '',
        rating: null,
        imgUrl: data.backdrop_path ? 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path : './../../../assets/img/not-image.png'
      }
      const backgroundImage = formatUrlImg(infosMovie.imgUrl);
      const backgroundImageInternal = formatUrlImgInternal(infosMovie.imgUrl);
      this.spotlighInfos = {
        backgroundImage,
        backgroundImageInternal,
        mostPopular: infosMovie
      }
    });
  }

}
