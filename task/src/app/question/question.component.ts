import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { nextContext } from '@angular/core/src/render3';
import { Router, NavigationExtras } from '@angular/router';
import { QuestionService } from './question.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger ('enterheading', [
        state('*',   style({transform: 'translateX(0) scale(1)'})),
        transition('void => *', [
          style({transform: 'translateX(0) scale(0.5)'}),
          animate('400ms ease-in')
        ])
    ]),
    trigger ('enteranswer', [
      state('*', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('600ms ease-in')
      ])
  ]),
    trigger ('enter', [
        state('*', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('1000ms ease-in')
      ])
    ])
   ]
})
export class QuestionComponent implements OnInit {
  color = 'red';
  mode = 'determinate';
  value;
  btnVal = 'Next';
  count = 0;
  q_a: any;
  UserDetails = JSON.parse(localStorage.getItem('User'));
  ListofQuestions = [];
  answer = [];
  test:any;
  selected: any;
  selectedcard: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.test = this.UserDetails[0].test;
    for (const QuestionsList of this.UserDetails[0].Questions) {
      for (const Questions in QuestionsList) {
        if (QuestionsList.hasOwnProperty(Questions)) {
          const element = QuestionsList[Questions];
          this.ListofQuestions.push(element);
        }
      }
    }
    this.next();
  }

  next() {
    this.selected = true;
    if (this.selectedcard) {
      this.answer.push(this.selectedcard);
    }
    if (this.count > this.ListofQuestions.length - 1) {
      this.questionService.test(this.answer, this.test).subscribe(data => {
        const navigationExtras: NavigationExtras = {
          queryParams: data[0], skipLocationChange: true
      }
        // const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
        this.router.navigate(['/result'], navigationExtras);
      });
      return;
      this.value = 0;
      this.btnVal = 'Next';
      this.count = 0;
    }
    this.q_a = this.ListofQuestions[this.count];
    this.count++;
    this.value = (this.count * 100) / this.ListofQuestions.length;
    if (this.count === 4) {
      this.btnVal = 'Submit';
    }
  }

  onSelectAnswer(ans, event) {
    this.selected = false;
    const ele = document.getElementsByClassName('active');
    if (ele[0]) {
      ele[0].classList.remove('active');
    }
    event.target.className = 'mat-card-content active';
    this.selectedcard = ans;
  }
}
