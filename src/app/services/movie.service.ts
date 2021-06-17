import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/Movies';
import { Movie } from '../model/Movie';
import {map, shareReplay, share} from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  BASE_URL = "api";
  
  private movies$:Observable<Movie[]> = empty();

  constructor(private http: HttpClient) { 
    this.movies$ = this.loadMovies();
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
}
