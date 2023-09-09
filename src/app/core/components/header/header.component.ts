import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from './../../../feature/services/storage/storage.service';
import { debounceTime, take } from 'rxjs';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { Router } from '@angular/router';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() valueSeachMovie = new EventEmitter<string>();
  public routes = ActiveRoutes;
  public typeCollection = TypeCollection;

  constructor(private readonly storageService: StorageService, private readonly router: Router) { }

  /**
   * recupera o valor da pesquisa
   */
  public setLanguage(language: string) {
    this.storageService.getLanguage.pipe(debounceTime(100), take(1)).subscribe(
      (data) => {
        if (data === language) {
          return;
        }         
        this.storageService.setLanguage = language;
      }
    )
  }

  /**
   * navega para a rota do botão clicado
   */
  public navigate(rote: string, type?: TypeCollection): void {
    if (type) {
      this.storageService.setTypeCollection = type;
    }
    if (rote === ActiveRoutes.COLLECTION) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([rote]);
    });
    } else {
      void this.router.navigate([rote]);

    }
  }
}
