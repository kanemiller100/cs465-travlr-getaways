import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/add', component: TripEditComponent },
  { path: 'trips/edit/:tripCode', component: TripEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
