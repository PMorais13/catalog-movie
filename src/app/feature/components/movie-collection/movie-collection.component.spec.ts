import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCollectionComponent } from './movie-collection.component';
import { StorageService } from '../../services/storage/storage.service';
import { TmbdService } from '../../services/tmdb/tmdb.service';
import { LoaderService } from 'src/app/core/components/loader/services/loader.service';
import { of } from 'rxjs';
import { GENRES } from 'src/app/shared/consts/genres.const';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const storageServiceStub = {
  getMoviesCache: () => {},
};
const tmbdServiceStub = {
  getMoviesWithGenres: () => {},
};
const loaderServiceStub = {
  loadStarted: () => {},
  loadCompleted: () => {},
};

fdescribe('MovieCollectionComponent', () => {
  let component: MovieCollectionComponent;
  let fixture: ComponentFixture<MovieCollectionComponent>;
  let storageService: StorageService;
  let tmbdService: TmbdService;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCollectionComponent],
      providers: [
        {
          provide: StorageService,
          value: storageServiceStub,
        },
        {
          provide: TmbdService,
          value: tmbdServiceStub,
        },
        {
          provide: LoaderService,
          value: loaderServiceStub,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(MovieCollectionComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    tmbdService = TestBed.inject(TmbdService);
    loaderService = TestBed.inject(LoaderService);
    component.allCollection = [];
    component.isLoaded = false;
    component['isMovie'] = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.allCollection).toEqual([]);
    expect(component.title).toBeDefined();
    expect(component.isLoaded).toBe(false);
    expect(component['isMovie']).toBeDefined();
  });

  it('should set the title based on the collection type', () => {
    component['isMovie'] = true;
    component.ngOnInit();
    expect(component.title).toBe('filmes');

    component['isMovie'] = false;
    component.ngOnInit();
    expect(component.title).toBe('séries');
  });

  it('should call getMoviesWithGenres if cache is empty', () => {
    spyOn<any>(storageService, 'getMoviesCache').and.returnValue([]);
    spyOn<any>(storageService, 'getSeriesCache').and.returnValue([]);
    spyOn<any>(component, 'getMoviesWithGenres');
    component['cachedList']();
    expect(component['getMoviesWithGenres']).toHaveBeenCalled();
  });

  it('should not call getMoviesWithGenres if cache is not empty', () => {
    spyOn<any>(storageService, 'getMoviesCache').and.returnValue([{}]);
    spyOn<any>(storageService, 'getSeriesCache').and.returnValue([{}]);
    spyOn<any>(component, 'getMoviesWithGenres');
    component['cachedList']();
    expect(component['getMoviesWithGenres']).not.toHaveBeenCalled();
  });

  it('should formatInfos correctly', () => {
    const testData = GENRES.map((genre, index) => ({
      results: [{}],
      name: genre.name,
    }));
    component['formatInfos'](testData);
    expect(component.allCollection.length).toBe(GENRES.length);
    expect(component.isLoaded).toBe(true);
  });

  it('should call loadStarted and loadCompleted when cache is used', () => {
      // Espie a função loadStarted
    const loadStartedSpy = spyOn(loaderService, 'loadStarted');
    // Espie a função loadCompleted
    const loadCompletedSpy = spyOn(loaderService, 'loadCompleted');

    // Simule que o cache não está vazio
    spyOn<any>(storageService, 'getMoviesCache').and.returnValue([{}]);
    spyOn<any>(storageService, 'getSeriesCache').and.returnValue([{}]);

    // Chame o método que deve acionar as funções espiãs
    component['cachedList']();

    // Verifique se as funções espiãs foram chamadas
    expect(loadStartedSpy).toHaveBeenCalled();
    expect(loadCompletedSpy).toHaveBeenCalled();
  });

  it('should call getMoviesWithGenres when cache is empty', () => {
    spyOn<any>(storageService, 'getMoviesCache').and.returnValue([]);
    spyOn<any>(storageService, 'getSeriesCache').and.returnValue([]);
    spyOn(tmbdService, 'getMoviesWithGenres').and.returnValue(of({}));
    spyOn<any>(component, 'formatInfos');
    component['cachedList']();
    expect(tmbdService.getMoviesWithGenres).toHaveBeenCalled();
  });
});
