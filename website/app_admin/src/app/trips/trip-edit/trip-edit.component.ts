import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-edit',
  standalone: false,
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  isEditMode = false;
  tripCode = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('tripCode');
    if (code) {
      this.isEditMode = true;
      this.tripCode = code;

      this.tripService.getTrip(code).subscribe({
        next: (data) => (this.trip = data),
        error: (err) => console.error('Error loading trip:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.tripService.updateTrip(this.tripCode, this.trip).subscribe({
        next: () => this.router.navigate(['/trips']),
        error: (err) => console.error('Error updating trip:', err)
      });
    } else {
      this.tripService.addTrip(this.trip).subscribe({
        next: () => this.router.navigate(['/trips']),
        error: (err) => console.error('Error adding trip:', err)
      });
    }
  }
}
