import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });

    return this.http.get<Trip[]>(`${this.baseUrl}/trips`, { headers });
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${code}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip);
  }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${code}`, trip);
  }

  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trips/${code}`);
  }
}
