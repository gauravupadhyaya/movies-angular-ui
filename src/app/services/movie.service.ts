import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/Movies';
import { Movie } from '../model/Movie';
import {map, shareReplay, share, filter, switchMap, mergeMap, delay} from 'rxjs/operators';
import { Observable, empty, Subject, combineLatest, forkJoin, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  BASE_URL = "api";

  selectLanguage:Subject<string> = new Subject();
  selectLocation:Subject<string> = new Subject();
  private selectedLanguage$:Observable<string>;
  private selectedLocation$:Observable<string>;

  private movies$:Observable<Movie[]> = empty();

  constructor(private http: HttpClient) { 
    this.movies$ = this.loadMovies();
    this.selectedLanguage$ = this.selectLanguage.asObservable();
    this.selectedLocation$ = this.selectLocation.asObservable();
  }

  getMovies():Observable<Movie[]>{
    return  this.movies$ ;
  }

  loadMovies(){
    return this.http.get<Movies>(this.BASE_URL + '/movies').pipe( map((data)=>data.movies),
    share());
  }

  getLanguages():Observable<string[]>{
    return this.getMovies().pipe(
      map((movies)=>movies.map(movie=>movie.Language).filter((language, index, array )=>array.findIndex(l=>l==language) ==index ))
    );
  }

  getLocation():Observable<string[]>{
    return this.getMovies().pipe(
      map((movies)=>movies.map(movie=>movie.Location).filter((location, index, array )=>array.findIndex(l=>l==location) ==index ))
    );
  }

  filteredMovies(){
    return combineLatest(
      this.selectedLanguage$,
      this.selectedLocation$,
      this.movies$
    ).pipe(
      map(([selectedLanguage,selectedLocation, movies])=>{
        console.log("filtering movies list.")
        let filteredMovies = movies;
        if(selectedLanguage){
          filteredMovies = filteredMovies.filter(movie=>movie.Language === selectedLanguage)
        } 
        if(selectedLocation){
          filteredMovies = filteredMovies.filter(movie=>movie.Location === selectedLocation)
        }
        return filteredMovies;
    }))
  }
}
