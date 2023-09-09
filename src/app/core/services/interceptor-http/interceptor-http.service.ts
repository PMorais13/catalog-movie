import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, throwError } from 'rxjs';
import { StorageService } from 'src/app/feature/services/storage/storage.service';
import { LoaderService } from '../../components/loader/services/loader.service';
import { ErrorHandlerService } from '../../components/error-handler/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorHttpRequest implements HttpInterceptor {
  constructor(
    private readonly storageService: StorageService,
    private readonly loaderService: LoaderService,
    private readonly errorHandlerer: ErrorHandlerService
  ) {}

  /**
   * intercepta as chamadas http
   * @param req request
   * @param next proximo interceptor ou backand
   * @returns
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loaderService.loadStarted();
    const reqClone = this.adjustParamRequest(req);

    return next.handle(reqClone).pipe(
      catchError((data: any) => {
        this.errorHandlerer.openErrorHandler();
        return throwError(() => new Error(data));
      }),
      finalize(() => {
        this.loaderService.loadCompleted();
      })
    );
  }

  private adjustParamRequest(req: any): HttpRequest<any> {
    return req.clone({
      setParams: {
        page: '1',
        api_key: 'c555adc36b44e965cef4567502b1614c',
        language: this.storageService.getStaticLanguage,
      },
      url: req.url + '?include_adult=false',
    });
  }
}
