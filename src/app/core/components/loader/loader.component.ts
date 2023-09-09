import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'div[loader]',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [MatProgressSpinnerModule],
    standalone: true
})
export class LoaderComponent {
}
