import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripForm } from './trip-form/trip-form';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Protected admin routes
  { path: 'trips', component: TripListing, canActivate: [AuthGuard] },
  { path: 'trips/new', component: TripForm, canActivate: [AuthGuard] },
  { path: 'trips/edit/:code', component: TripForm, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: '**', redirectTo: 'trips' }
];