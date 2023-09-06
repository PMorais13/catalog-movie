import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize } from "rxjs";
import { endpoint } from "src/app/core/settings/url";
import { StorageService } from "src/app/feature/services/storage/storage.service";

@Injectable({
    providedIn: 'root'
}) 

export class TmdbRepository {
    private params = new HttpParams()
    .set('page', '1')
    .set('api_key', 'c555adc36b44e965cef4567502b1614c')
    /**
     * 
     * @param http serviço de chamadas http do angular
     */
    constructor(private http: HttpClient, 
        private readonly storageService: StorageService){
        }

    /**
     * faz a chamada para a api do tmdb
     * @param id filme pesquisado
     * @returns 
     */
    public searchMovie(id: string): Observable<any>{
        const params = this.params.set('language', this.storageService.getStaticLanguage);
        const url = `${endpoint.search}?query=${id}`; 
        return this.http.get(url, {
            params
        });
    }

    /**
     * recupera a lista de filmes mais populares
     * @returns lista de filmes populares
     */
    public getListMovies(url: string): Observable<any> {
        this.storageService.loading = true;
        const params = this.params.set('language', this.storageService.getStaticLanguage);
        return this.http.get(url, {
            params
        });
    }
}

