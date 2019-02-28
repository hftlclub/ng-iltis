import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  token$: BehaviorSubject<TokenResponse>;
  authenticated$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.token$ = new BehaviorSubject<TokenResponse>(this.getFromLocalStorage());
    this.authenticated$ = this.token$.pipe(map(t => !!t));

    this.token$.subscribe(t => {
      if (t === null) {
        this.clearLocalStorage();
      } else { this.saveToLocalStorage(t); }
    });
  }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };

    this.http.post<TokenResponse>('http://localhost:3003/auth', body)
      .subscribe(this.token$);
  }

  logout() {
    this.unsetToken();
  }

  unsetToken() {
    this.token$.next(null);
  }

  saveToLocalStorage(tr: TokenResponse) {
    localStorage.setItem('token', tr.token);
    localStorage.setItem('tokenExpiresIn', tr.expiresIn.toString());
    localStorage.setItem('tokenType', tr.type);
  }

  getFromLocalStorage(): TokenResponse {
    const token = localStorage.getItem('token');
    const expiresIn = parseInt(localStorage.getItem('tokenExpiresIn'), 10);
    const type = localStorage.getItem('tokentype');

    if (!token || !expiresIn || !type) {
      return null;
    }
    return { token, expiresIn, type };
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresIn');
    localStorage.removeItem('tokenType');
  }

}


interface TokenResponse {
  token: string;
  expiresIn: number;
  type: string;
}
