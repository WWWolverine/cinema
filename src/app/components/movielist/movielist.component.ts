import { Component, OnInit } from '@angular/core';

import { IPreview } from 'src/app/preview';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit {
  constructor(private _movieService: MoviesService) {}

  ngOnInit(): void {}
}
