import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './app/services/jwt.interceptor';


provideHttpClient(withInterceptorsFromDi()),
{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
