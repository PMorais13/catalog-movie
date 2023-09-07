import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss']
})
export class MovieCollectionComponent implements OnInit {

  public title: string;
  constructor(private readonly storageService: StorageService) {
    this.title = this.storageService.getTypeCollection;
  }

  ngOnInit() {
  }

}
