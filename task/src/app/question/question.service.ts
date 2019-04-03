import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Test {
  name: string;
  test: string;
  result: any;
  error: string;
}

@Injectable({
  providedIn: 'root'
})


export class QuestionService {
  resultUrl = 'http://localhost:8626/api/result';

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  constructor(private http: HttpClient) { }



  test(testAnswer, testName): Observable<Test> {
    const req = {testName, testAnswer};

      return this.http.post<Test>(this.resultUrl, req, httpOptions)
        .pipe(
          map((data) => data),
          retry(3)
          // catchError(this.handleError(data))
        );
    }

  }


