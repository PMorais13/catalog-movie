import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { StorageService } from '../../services/storage/storage.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor(private readonly tmbdService: TmbdService, private readonly storageService: StorageService) { }

  /**
   * recupera a lista da pesquisa
   */
  ngOnInit() {
    this.getResults();
  }

  /**
   * recupera a pesquisa do user e faz a chamada para a api
   */
  private getResults(): void {
    const search = this.storageService.getSearch;
    this.tmbdService.getMovie(search).pipe(take(1)).subscribe((data: any) => {
      console.log(data);
    })
  }
}
