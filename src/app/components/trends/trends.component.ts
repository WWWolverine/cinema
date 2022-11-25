import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  public movies: IMovie[] = [];
  public pageSlice = this.movies.slice(0, 2);
  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.movies.length) {
      endIndex = this.movies.length;
    }
    this.pageSlice = this.movies.slice(startIndex, endIndex);
  }

  public p: number = 1;
  public itemsPage: number = 5;
  public totalPorduct: any;
  public totalMovies: number = 0;
  public filterCategory: any;
  public searchKey: string = '';
  public searchTerm: string = '';
  public bestMovies: any;
  public openMovie: boolean = false;
  films: any = [];
  openId: any;
  opened: any;
  movieForm!: FormGroup;
  constructor(
    private _movieService: MoviesService,
    private searchService: SearchService
  ) {}

  retrieveMovies() {
    this._movieService.getMovies().subscribe((data) => (this.movies = data));
    this.totalPorduct = this.movies.length;
  }

  ngOnInit(): void {
    this._movieService.getMovies().subscribe((data) => (this.movies = data));
    this.retrieveMovies();
    this._movieService.getMovies().subscribe((res) => {
      this.filterCategory = res;
    });
    this.searchService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.searchService.getPoducts().subscribe((res) => {
      this.totalMovies = res.length;
    });
    this._movieService.getMovies().subscribe((res) => {
      this.movies = res;
      this.bestMovies = this.movies.sort((a, b) => b.rating - a.rating);
    });
    this.searchService.getPoducts().subscribe((res) => {
      this.films = res;
    });
  }

  filter(title: string) {
    this.filterCategory = this.movies.filter((a: any) => {
      if (a.title == title || title == '') {
        console.log(a);
        return a;
      }
    });
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.searchService.search.next(this.searchTerm);
  }

  openClose(movie: any) {
    this.searchService.addToCart(movie);
  }
  addtocart(movie: any) {
    this.searchService.addToCart(movie);
    console.log(movie);
    console.log(this.films);
    console.log(this.searchService);

    this.openMovie = !this.openMovie;
  }
  removeItem(movie: any) {
    this.openMovie = !this.openMovie;
    this.searchService.removeCartItem(movie);
  }
}
