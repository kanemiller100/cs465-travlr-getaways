import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() deleteTrip = new EventEmitter<string>();

  onDelete(): void {
    this.deleteTrip.emit(this.trip.code);
  }
}
