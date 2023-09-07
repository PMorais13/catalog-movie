import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { StorageService } from 'src/app/feature/services/storage/storage.service';
import { InfoCaroucel } from 'src/app/interfaces/info-carousel.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() public infosCarousel: Array<InfoCaroucel> = [];
  public customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  /**
   * ouve o clique na imagem e seleciona o filme
   */
  public selectMovie(id: number): void {
    console.log(id);
    this.storageService.setIdSelectedMovie = id;
    void this.router.navigate([ActiveRoutes.SELECT]);
  }
}
