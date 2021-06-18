import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/Movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit , AfterViewInit{

  movies$:Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = movieService.filteredMovies();
    
   }

  ngOnInit(): void {
    this.movieService.selectLanguage.next('');
  }

  ngAfterViewInit(){
    this.movieService.selectLanguage.next('');
    this.movieService.selectLocation.next('');
  }

}
