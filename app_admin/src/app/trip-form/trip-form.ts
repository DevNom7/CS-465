import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-form.html',
  styleUrls: ['./trip-form.css']
})
export class TripForm implements OnInit {
  isEdit = false;
  loading = false;
  error = '';

  // This is what ngModel should bind to
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',        // keep as string; we convert on savee
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private tripService: TripDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');

    if (code) {
      this.isEdit = true;
      this.loading = true;

      this.tripService.getTrip(code).subscribe({
        next: (data: Trip) => {
          // Convert start to YYYY-MM-DD for <input type="date">
          const dateOnly = data.start ? String(data.start).slice(0, 10) : '';

          this.trip = {
            ...data,
            start: dateOnly
          };

          this.loading = false;
        },
        error: (err: unknown) => {
          console.error(err);
          this.error = 'Failed to load trip for edit.';
          this.loading = false;
        }
      });
    }
  }

  onSave(): void {
    this.error = '';
    this.loading = true;

    // Convert date string -> ISO string so Mongoose accepts it
    const payload: Trip = {
      ...this.trip,
      start: this.trip.start ? new Date(this.trip.start as any).toISOString() : ('' as any)
    };

    if (this.isEdit) {
      this.tripService.updateTrip(this.trip.code, payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err: unknown) => {
          console.error(err);
          this.error = 'Failed to update trip.';
          this.loading = false;
        }
      });
    } else {
      this.tripService.addTrip(payload).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err: unknown) => {
          console.error(err);
          this.error = 'Failed to add trip.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
