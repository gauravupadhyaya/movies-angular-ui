import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/Movies';
import { Movie } from '../model/Movie';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  BASE_URL = "api";
  constructor(private http: HttpClient) {  }

  getMovies():Observable<Movie[]>{
    return this.loadMovies().pipe(
      map((data)=>data.movies)
    )
  }

  loadMovies(){
    return this.http.get<Movies>(this.BASE_URL + '/movies');
  }
}
