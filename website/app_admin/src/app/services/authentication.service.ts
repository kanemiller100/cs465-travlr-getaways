import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = '/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  public login(user: { email: string; password: string }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiBaseUrl}/login`, user);
  }

  public register(user: { name: string; email: string; password: string }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiBaseUrl}/register`, user);
  }

  public logout(): void {
    localStorage.removeItem('travlr-token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}
