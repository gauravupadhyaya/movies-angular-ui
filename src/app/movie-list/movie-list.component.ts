import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/Movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies$:Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = movieService.getMovies();
   }

  ngOnInit(): void {
    
  }

}
