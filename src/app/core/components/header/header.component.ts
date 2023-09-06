import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from './../../../feature/services/storage/storage.service';
import { debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() valueSeachMovie = new EventEmitter<string>(); 
  constructor(private readonly storageService: StorageService) {}

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
}
