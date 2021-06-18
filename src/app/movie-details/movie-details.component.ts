import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/Movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie|null =null;

  constructor(private route: ActivatedRoute, private movieService : MovieService) {
    
   }

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('imdbId');
    this.movieService.getMovie(imdbId).subscribe((movies)=>this.movie = movies[0]);
  }

}
