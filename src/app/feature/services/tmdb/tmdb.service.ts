import { Injectable } from "@angular/core";
import { TmdbRepository } from "../../../repository/tmdb/tmds.repository";

@Injectable({
    providedIn: 'root'
}) 

export class TmbdService {

    constructor(private readonly tmdbRepository: TmdbRepository){}

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
}