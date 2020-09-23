import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../../services/cabservice.service';
import { PassengerModel } from '../../models/passenger-model.model';
import { AvailableCabModel } from '../../models/available-cab-model.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  isInregisterMode = false;
  isInLoginMode = false;
  passenger = new PassengerModel();
  assignedCab: AvailableCabModel;

  logEmail: string;
  logMobile: string;

  loggedInUser: PassengerModel;

  constructor(private readonly cabservice: CabserviceService) { }

  onClose() {
    this.isInregisterMode = false;
  }
  onLoginClose() {
    this.isInLoginMode = false;
  }


  onUserLogin() {
    this.isInLoginMode = true;
  }

  registerPassenger() {
    this.isInregisterMode = true;
  }


  onUserSignin() {
    console.log('email :' + this.logEmail);
    this.cabservice.passengerSignin({ email: this.logEmail, mobile: this.logMobile }).subscribe((passenger: PassengerModel) => {
      this.loggedInUser = passenger;
      this.isInLoginMode = false;
    })
  }

  addNewPassenger() {
    this.cabservice.registerPassenger(this.passenger).subscribe((result: AvailableCabModel[]) => {
      console.log("Passenger/Rider successfully registered");
      this.isInregisterMode = false;
    });
  }

  onGetCab() {
    this.cabservice.bookCab({ latitude: 2, longitude: 2 }).subscribe(result => {
      this.assignedCab = result[0];
    })
  }

  onTripEnd() {
    this.cabservice.addCurrentTravelDetail(this.loggedInUser.id, this.assignedCab).subscribe(result => {

    });
  }

  showTravelHistory() {
    console.log('history clicked');
    this.cabservice.getRidesHistory(this.loggedInUser.id).subscribe(result => {

    });
  }

  ngOnInit(): void {
  }

}
