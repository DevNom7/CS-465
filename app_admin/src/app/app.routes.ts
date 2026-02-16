import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripForm } from './trip-form/trip-form';

export const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'trips/new', component: TripForm },
  { path: 'trips/edit/:code', component: TripForm },
  { path: '**', redirectTo: '' }
];
