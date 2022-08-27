import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  // modify the return type to properly use the full response
  login(username: string, password: string){
    localStorage.setItem('username', username);
    const credentials = {
      email: username,
      password: password,
    };
    return this.http
      .post(`https://reqres.in/api/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  loginUserName() {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['']);
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }
}
