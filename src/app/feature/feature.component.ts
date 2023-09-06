import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  constructor(public readonly storageService: StorageService) {}
}
