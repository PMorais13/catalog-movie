import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TypeCollection } from "src/app/enums/tipe-collection.enum";

@Injectable({
    providedIn: 'root'
}) 

export class StorageService {
    private typeCollection =  TypeCollection.MOVIE;
    private staticLanguage = 'pt-BR';
    private language = new BehaviorSubject<string>(this.staticLanguage);
    private indexMostPopularMovie: number| null = null;
    private idSelectedMovie: number = 0;
    private search = '';
    private pagination = 1;
    private requestFirstPage = [];
    private moviesCache = [];
    private seriesCache = [];

    public get getSeriesCache () {
        return this.seriesCache;
    }

    public get getMoviesCache () {
        return this.moviesCache;
    }

    public get getRequestFirstPage () {
        return this.requestFirstPage;
    }
    
    public get getPagination () {
        return this.pagination;
    }

    public get getSearch () {
        return this.search;
    }

    public get getTypeCollection () {
        return this.typeCollection;
    }

    public get getIdSelectedMovie () {
        return this.idSelectedMovie;
    }

    public get getLanguage () {
        return this.language
    }

    public get getStaticLanguage () {
        return this.staticLanguage
    }

    public get getIndexMostPopularMovie () {
        return this.indexMostPopularMovie;
    }

    public set setLanguage (newLanguage: string) {
        this.staticLanguage = newLanguage;
        this.language.next(newLanguage);        
    }

    public set setIndexMostPopularMovie (index: number) {
        this.indexMostPopularMovie = index;
    }

    public set setIdSelectedMovie (id: number) {
        this.idSelectedMovie = id;
    }

    public set setTypeCollection (type: TypeCollection) {
        this.typeCollection = type;
    }

    public set setSearch (search: string) {
        this.search = search;
    }

    public set setPagination (page: number) {
        this.pagination = page;
    }

    public set setRequestFirstPage (requests: any) {
        this.requestFirstPage = requests;
    }

    public set setMoviesCache (moviesCache: any) {
        this.moviesCache = moviesCache;
    }

    public set setSeriesCache (seriesCache: any) {
        this.seriesCache = seriesCache;
    }
}