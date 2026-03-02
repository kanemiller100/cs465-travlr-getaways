import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../models/trip';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() deleteTrip = new EventEmitter<string>();

  constructor(public authService: AuthenticationService) {}

  onDelete(): void {
    if (!this.authService.isLoggedIn()) return;
    this.deleteTrip.emit(this.trip.code);
  }
}
