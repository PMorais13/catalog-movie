import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoint, ulrBase } from 'src/app/core/settings/url';
import { TypeCollection } from 'src/app/enums/tipe-collection.enum';

@Injectable({
  providedIn: 'root',
})
export class TmdbRepository {
  private params = new HttpParams();
  /**
   *
   * @param http serviço de chamadas http do angular
   */
  constructor(private http: HttpClient) {}

  /**
   * faz a chamada para a api do tmdb
   * @param id filme pesquisado
   * @returns
   */
  public searchMovie(id: string): Observable<any> {
    const url = `${endpoint.search}?query=${id}&include_adult=false`;
    return this.http.get(url);
  }

  /**
   * recupera a lista de filmes mais populares
   * @returns lista de filmes populares
   */
  public getListMovies(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * retorna o filme específico selecionado pelo usuário
   * @param id
   */
  public getIdMovie(id: string, type: TypeCollection) {
    const url = `${ulrBase}/${type}/${id}`;
    return this.http.get(url);
  }

  public getMoviesWithGenres(genre: string = '28', type = 'movie') {    
    const params = this.params.set('with_genres', genre);
    return this.http.get(endpoint.discover + type, {
      params,
    });
  }
}
