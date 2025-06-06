import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly key = 'favorites';

  /**
   * Recupera lista de favoritos do localStorage
   */
  public get favorites(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Salva lista de favoritos no localStorage
   */
  private set favoritesList(list: any[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  public isFavorite(id: number): boolean {
    return this.favorites.some(item => item.id === id);
  }

  public add(movie: any): void {
    if (!this.isFavorite(movie.id)) {
      const list = [...this.favorites, movie];
      this.favoritesList = list;
    }
  }

  public remove(id: number): void {
    const list = this.favorites.filter(item => item.id !== id);
    this.favoritesList = list;
  }

  public toggle(movie: any): void {
    this.isFavorite(movie.id) ? this.remove(movie.id) : this.add(movie);
  }
}
