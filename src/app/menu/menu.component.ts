import { DishdetailComponent } from './../dishdetail/dishdetail.component';
import { Dish } from '../shared/dish';
import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from './../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;
  errMsg: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(
        dishes => this.dishes = dishes,
        err => this.errMsg = <any> err
      );
  }

  onSelect(currDish: Dish) {
    this.selectedDish = currDish;
  }

}
