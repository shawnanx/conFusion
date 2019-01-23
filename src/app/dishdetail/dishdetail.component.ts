import { Comment } from './../shared/comment';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from './../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective;
  dish: Dish;
  dishIds: string[];
  next: string;
  prev: string;
  errMsg: string;
  dishCopy: Dish;
  visibility = 'shown';

  commentForm: FormGroup;
  newComment: Comment;
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'Comment is required.'
    }
  };


  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
    ) {
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(
      (dishIds) => this.dishIds = dishIds );

    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      })).subscribe(
        dish => {
          this.dish = dish;
          this.dishCopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        err => {
          this.errMsg = <any> err;
        }
      );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5, Validators.required ],
      comment: ['', Validators.required ],
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.newComment = this.commentForm.value;
    this.newComment.date = new Date().toISOString();
    console.log(this.newComment);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
    this.dishCopy.comments.push(this.newComment);
    this.dishService.putDish(this.dishCopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishCopy = dish;
      },
      err => {
        this.dish = null;
        this.dishCopy = null;
        this.errMsg = <any>err;
      }
    );
  }
}
