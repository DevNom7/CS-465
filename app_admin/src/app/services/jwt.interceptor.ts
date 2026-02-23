import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('/api/login') || req.url.includes('/api/register')) {
      return next.handle(req);
    }

    const token = this.auth.getToken();
    if (!token) return next.handle(req);

    return next.handle(
      req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    );
  }
}