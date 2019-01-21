import { DishdetailComponent } from './../dishdetail/dishdetail.component';
import { Dish } from '../shared/dish';
import { Component, OnInit } from '@angular/core';

import { DishService } from './../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService) {
  }

  ngOnInit() {
    this.dishService.getDishes()
      .then(dishes => this.dishes = dishes);
  }

  onSelect(currDish: Dish) {
    this.selectedDish = currDish;
  }

}
