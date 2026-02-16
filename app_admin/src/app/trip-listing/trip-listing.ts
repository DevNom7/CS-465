import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListing implements OnInit {
  title = 'Travlr Getaways';
  trips: Trip[] = [];
  loading = false;
  error = '';

  constructor(
    private tripService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges(); // show Loading immediately

    this.tripService.getTrips()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges(); // FORCE UI update
      }))
      .subscribe({
        next: (data: Trip[]) => {
          console.log('Trips from API:', data);
          this.trips = Array.isArray(data) ? data : [];
          this.cdr.detectChanges(); // FORCE UI update
        },
        error: (err: unknown) => {
          console.error('Trip loading error:', err);
          this.error = 'Failed to load trips from API.';
          this.trips = [];
          this.cdr.detectChanges(); // FORCE UI update
        }
      });
  }

  goAdd(): void {
    this.router.navigate(['/trips/new']);
  }

  onEdit(trip: Trip): void {
    this.router.navigate(['/trips/edit', trip.code]);
  }

  onDelete(trip: Trip): void {
    if (!confirm(`Delete ${trip.name}?`)) return;

    this.tripService.deleteTrip(trip.code).subscribe({
      next: () => this.loadTrips(),
      error: (err: unknown) => {
        console.error('Delete error:', err);
        this.error = `Failed to delete ${trip.name}.`;
        this.cdr.detectChanges();
      }
    });
  }
}
