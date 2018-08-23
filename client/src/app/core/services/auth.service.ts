import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Authenticate } from '../models/user.model';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api';
  private helper = new JwtHelperService();
  token: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }

  login({username, password}: Authenticate): Observable<any> {
    return this.http.post<User>(`${this.BASE_URL}/users/authenticate`, { username, password }).pipe(
      map(user => {
        if (user && user.token) {
          console.log('logged in user', user);
          this.token = this.helper.decodeToken(user.token);

          console.log('user token', this.token)
          this.snackBar.open("Login", "Success", { duration: 2000 });

          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
  }

  register(user: User): Observable<User> {
    const url = `${this.BASE_URL}/users/register`;
    return this.http.post<User>(url, { user });
  }

  logout() {
    localStorage.clear();
    this.snackBar.open("Logout", "", { duration: 2000 });
    setTimeout(() => { this.router.navigate(['auth/login']) });
  }
}
