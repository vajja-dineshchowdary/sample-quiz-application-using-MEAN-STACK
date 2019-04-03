import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  example: string;
  UserDetails = JSON.parse(localStorage.getItem('User'));
  result;
  NoOfQuestions;
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  userName = this.UserDetails[0].name;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.result = params.result;
      this.NoOfQuestions = params.NoOfQuestions;
      localStorage.removeItem('User');
    });
  }
}
