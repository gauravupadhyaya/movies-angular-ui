import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {

  languages$:Observable<string[]>;
  locations$:Observable<string[]>;
  selectedLanguage:string='';
  selectedLocation:string='';

  constructor(private movieService : MovieService) { 
    this.languages$ = this.movieService.getLanguages();
    this.locations$ = this.movieService.getLocation();
  }

  ngOnInit(): void {
   
  }
  
  onChange(){
    this.movieService.selectLanguage.next(this.selectedLanguage);
    this.movieService.selectLocation.next(this.selectedLocation);
  }
}
