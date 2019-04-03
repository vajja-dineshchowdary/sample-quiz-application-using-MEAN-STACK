import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { StartService } from './start.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  animations: [
    trigger ('enterheading', [
        state('*',   style({transform: 'translateX(0) scale(1)'})),
        transition('void => *', [
          style({transform: 'translateX(0) scale(0.5)'}),
          animate('400ms ease-in')
        ])
    ]),
    trigger ('enter', [
        state('*', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('900ms ease-in')
      ])
    ])
   ]
})
export class StartComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  durationInSeconds = 3;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Technical task', cols: 1, rows: 1 }];
      }

      return [{ title: 'Technical task', cols: 1, rows: 1 }];
    })
  );

  taskForm = this.fb.group({
    name: ['', [
      Validators.minLength(3),
      Validators.required
    ]],
    test: ['',
      Validators.required
    ]
  });

  onSubmit() {

    if (this.taskForm.valid) {
      this.startService.startTest(this.taskForm.value).
            subscribe((data) => {
              if (!data.error) {
                localStorage.setItem('User', JSON.stringify(data));
                this.router.navigateByUrl('/test');
              } else {
                const Undo = 'Close';
                this.snackBar.open(data.error, Undo, {duration: this.durationInSeconds * 1000});
              }

            });
    }
  }



  get name() { return this.taskForm.get('name'); }
  get test() { return this.taskForm.get('test'); }
  constructor(
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private startService: StartService,
    private router: Router,
    private fb: FormBuilder,
    ) {}
    ngOnInit() {
     localStorage.removeItem('User');
    }
}
