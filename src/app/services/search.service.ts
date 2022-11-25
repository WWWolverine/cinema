import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public cartItemList: any = [];
  public moviesList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getPoducts() {
    return this.moviesList.asObservable();
  }

  setProduct(films: any) {
    this.cartItemList.push(...films);
    this.moviesList.next(films);
  }
  addToCart(films: any) {
    this.cartItemList.push(films);
    this.moviesList.next(this.cartItemList);
  }
  removeCartItem(products: any) {
    this,
      this.cartItemList.map((a: any, index: any) => {
        if (products.id === a.id) {
          this.cartItemList.splice(index, 1);
        }
      });
    this.cartItemList.next(this.cartItemList);
  }
}
