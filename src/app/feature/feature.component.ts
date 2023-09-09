import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';
import { ActiveRoutes } from '../enums/routes.enum';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  constructor(private readonly route: Router, public readonly storageService: StorageService) {}

  /**
   * manda para a rota inicial
   */
  public ngOnInit(): void {
    void this.route.navigate([ActiveRoutes.SEARCH])
  }
}
