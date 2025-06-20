import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginUrl = 'http://localhost:4000/api/auth/login';

  // 👇 track login state
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  getLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  hasToken(): boolean {
    if (typeof window === 'undefined') return false; // SSR-safe
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }
}
