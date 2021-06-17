import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/Movies';
import { Movie } from '../model/Movie';
import {map} from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesLoaded:boolean=false;
  private movies$:Observable<Movie[]> = empty();
  BASE_URL = "api";
  constructor(private http: HttpClient) { 
   }

  getMovies():Observable<Movie[]>{
    if(!this.moviesLoaded){
      this.movies$ =  this.loadMovies().pipe(
        map((data)=>data.movies)
      )
    }
    this.moviesLoaded = true;
    return this.movies$;
  }

  loadMovies(){
    return this.http.get<Movies>(this.BASE_URL + '/movies');
  }

  getLanguages():Observable<string[]>{
    return this.getMovies().pipe(
      map((movies)=>movies.map(movie=>movie.Language).filter((language, index, array )=>array.findIndex(l=>l==language) ==index ))
    );
  }
}
