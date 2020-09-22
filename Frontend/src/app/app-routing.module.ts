import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { DriverComponent } from '../app/components/driver/driver.component';
import { PassengerComponent } from '../app/components/passenger/passenger.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'passenger', component: PassengerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
