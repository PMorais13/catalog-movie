import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions, CarouselComponent as Carousel } from 'ngx-owl-carousel-o';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { StorageService } from 'src/app/feature/services/storage/storage.service';
import { InfoCaroucel } from 'src/app/interfaces/info-carousel.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent extends BaseComponent implements AfterViewInit {
  @ViewChild(Carousel) public dragCarousel!: Carousel;
  @Input({required: true}) public infosCarousel!: InfoCaroucel;
  public customOptions: OwlOptions = {
    loop: true,
    autoHeight: true,
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
  private _grabbing = false;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
    super();
  }

  /**
   * inicia o observable no carousel após o carregamento dele
   */
  public ngAfterViewInit(): void {
      this.dragCarousel.dragging.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this._grabbing = true;
      })
  }

  /**
   * ouve o clique na imagem e seleciona o filme
   */
  public selectMovie(id: number): void {
    if (this._grabbing) {
      this._grabbing = false;

      return;
    }
    this.storageService.setIdSelectedMovie = id;
    void this.router.navigate([ActiveRoutes.SELECT]);
  }
}
