import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ActiveRoutes } from 'src/app/enums/routes.enum';
import { ErrorHandlerService } from './services/error-handler.service';

@Component({
  selector: 'div[error-handler]',
  templateUrl: 'error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  standalone: true,
})
export class ErrorHandlerComponent {
  constructor(private readonly router: Router, private readonly errorHandlerService: ErrorHandlerService) {}

  /**
   * redireciona para a home
   */
  public goHome(): void {
    this.errorHandlerService.destroyErrorHandlerComponent();
    if (this.router.url === '/' + ActiveRoutes.HOME) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([ActiveRoutes.HOME]);
    });
  }else {
    this.router.navigate([ActiveRoutes.HOME]);
  }
}
}