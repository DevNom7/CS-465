import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'travlr_token';

  constructor(private http: HttpClient) {}

  private get storage(): Storage | null {
    // Prevent SSR / non-browser crashes
    if (typeof window === 'undefined') return null;
    return window.localStorage;
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>('/api/login', { email, password }).pipe(
      tap(res => this.storage?.setItem(this.tokenKey, res.token))
    );
  }

  logout() {
    this.storage?.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return this.storage?.getItem(this.tokenKey) ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}