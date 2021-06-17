import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {

  languages$:Observable<string[]>;

  constructor(private movieService : MovieService) { 
    this.languages$ = this.movieService.getLanguages();
  }

  ngOnInit(): void {

  }

}
