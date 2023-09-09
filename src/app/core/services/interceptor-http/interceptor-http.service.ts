import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, map } from 'rxjs';
import { StorageService } from 'src/app/feature/services/storage/storage.service';
import { LoaderService } from '../../components/loader/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorHttpRequest implements HttpInterceptor {
  private params = new HttpParams()
    .set('page', '1')
    .set('api_key', 'c555adc36b44e965cef4567502b1614c');
  constructor(private readonly storageService: StorageService, private readonly loaderService: LoaderService) {}

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
      finalize(() => {
        // this.loaderService.loadCompleted();
      })
    );
  }

  private adjustParamRequest(req: any): HttpRequest<any> {
    return req.clone({
        setParams: {
            'page': '1',
            'api_key': 'c555adc36b44e965cef4567502b1614c',
            'language': this.storageService.getStaticLanguage,
        },
        url: req.url + '?include_adult=false'
    })
  }
}
