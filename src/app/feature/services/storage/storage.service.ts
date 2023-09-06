import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
}) 

export class StorageService {
    private staticLanguage = 'pt-BR';
    private language = new BehaviorSubject<string>(this.staticLanguage);
    private indexMostPopularMovie: number| null = null;
    public loading = false

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
}