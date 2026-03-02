import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trip-list',
  standalone: false,
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripDataService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => (this.trips = data),
      error: (err) => console.error('Error loading trips:', err)
    });
  }

  onDeleteTrip(code: string): void {
    if (!this.authService.isLoggedIn()) return;
    if (!confirm('Delete this trip?')) return;

    this.tripService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: (err) => console.error('Error deleting trip:', err)
    });
  }
}
