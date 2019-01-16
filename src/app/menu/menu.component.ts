import { DishdetailComponent } from './../dishdetail/dishdetail.component';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] = DISHES;
  selectedDish: Dish;

  constructor() { }

  ngOnInit() {
    // this.selectedDish = DISHES[0];
  }

  onSelect(currDish: Dish) {
    this.selectedDish = currDish;
  }

}
