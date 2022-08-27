import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class GetAllUserService {
  constructor(private http: HttpClient, private router: Router) {}

  listUserDetails() {
    return this.http
      .get(`https://reqres.in/api/unknown`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}