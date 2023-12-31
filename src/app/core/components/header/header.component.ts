import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from './../../../feature/services/storage/storage.service';
import { debounceTime, take } from 'rxjs';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { Router } from '@angular/router';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() valueSeachMovie = new EventEmitter<string>();
  public routes = ActiveRoutes;
  public typeCollection = TypeCollection;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  /**
   * recupera o valor da pesquisa
   */
  public setLanguage(language: string) {
    this.storageService.getLanguage
      .pipe(debounceTime(100), take(1))
      .subscribe((data) => {
        if (data === language) {
          return;
        }
        this.storageService.setLanguage = language;
      });
  }

  /**
   * navega para a rota do botão clicado
   */
  public navigate(route: string, type?: TypeCollection): void {
    if (type) {
      this.storageService.setTypeCollection = type;
    }
    if (route === ActiveRoutes.COLLECTION) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([route]);
      });
    } else {
      void this.router.navigate([route]);
    }
  }

  /**
   * salva os valores da pesquisa e redireciona para a rota de pesquisa
   * @param event pesquisa
   */
  public searching(event: string) {
    this.storageService.setSearch = event;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([ActiveRoutes.SEARCH]);
    });
  }
}
