import { DishdetailComponent } from './../dishdetail/dishdetail.component';
import { Dish } from '../shared/dish';
import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from './../services/dish.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
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
