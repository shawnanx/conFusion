import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from './../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    // simulate server latency w 2s delay
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    // simulate server latency w 2s delay
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    // simulate server latency w 2s delay
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
