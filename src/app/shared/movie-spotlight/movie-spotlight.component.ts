import { Component, OnInit, Input } from '@angular/core';
import { SpotlighInfos } from 'src/app/interfaces/spotligh-info.interface';


@Component({
  selector: 'app-movie-spotlight',
  templateUrl: './movie-spotlight.component.html',
  styleUrls: ['./movie-spotlight.component.scss']
})
export class MovieSpotlightComponent implements OnInit {
  @Input() public spotlighInfos!: SpotlighInfos;

  ngOnInit() {
    console.log('spot', this.spotlighInfos);
  }
}
