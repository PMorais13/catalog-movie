import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { StorageService } from "src/app/feature/services/storage/storage.service";

@Injectable({
    providedIn: 'root',
})

export class InterceptorHttpRequest implements HttpInterceptor {

    constructor(private readonly storageService: StorageService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(finalize(() => {
            this.storageService.loading = false;
        }))
    }
}