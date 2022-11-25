import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovie } from '../movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _url: string = '/assets/data/movies.json';
  public search = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this._url);
  }
}
