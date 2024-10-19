import { Injectable } from "@angular/core";
import { TmdbRepository } from "../../../repository/tmdb/tmds.repository";
import { StorageService } from "../storage/storage.service";

@Injectable({
    providedIn: 'root'
}) 

export class TmbdService {

    constructor(private readonly tmdbRepository: TmdbRepository, private readonly storageService: StorageService){}

    /**
     * procura o filme pesquisado
     */
    public getMovie(movie: string): any {        
        return this.tmdbRepository.searchMovie(movie)
    }

    /**
     * procura o filme pesquisado
     */
    public getListMovies(url: string): any {
        return this.tmdbRepository.getListMovies(url);
    }

    public getIdMovie(id: number): any {
        const idFormat = id.toString();
        const type = this.storageService.getTypeCollection;

        return this.tmdbRepository.getIdMovie(idFormat, type);
    }

    /**
     * busca a lista de filmes pelo genero
     * @param genre genero dos filmes
     */
    public getMoviesWithGenres(genre?: string): any {
        const type = this.storageService.getTypeCollection;
        return this.tmdbRepository.getMoviesWithGenres(genre, type);
    }
}