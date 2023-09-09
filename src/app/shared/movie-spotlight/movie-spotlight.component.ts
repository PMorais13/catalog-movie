import { Component, Input } from '@angular/core';
import { SpotlighInfos } from 'src/app/interfaces/spotligh-info.interface';


@Component({
  selector: 'app-movie-spotlight',
  templateUrl: './movie-spotlight.component.html',
  styleUrls: ['./movie-spotlight.component.scss']
})
export class MovieSpotlightComponent {
  @Input() public spotlighInfos!: SpotlighInfos;
}
