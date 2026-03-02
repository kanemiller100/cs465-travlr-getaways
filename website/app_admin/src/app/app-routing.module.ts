import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/add', component: TripEditComponent, canActivate: [AuthGuard] },
  { path: 'trips/edit/:tripCode', component: TripEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
