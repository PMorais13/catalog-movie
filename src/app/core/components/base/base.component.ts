import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
    providedIn: 'root'
}) 
export abstract class BaseComponent implements OnDestroy {
    protected onDestroy = new Subject<void>();

    public ngOnDestroy(): void {
        this.onDestroy.next(void 0);
        this.onDestroy.complete();
    }
}