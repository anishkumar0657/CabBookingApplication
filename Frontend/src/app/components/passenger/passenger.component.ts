import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../../services/cabservice.service';
import { PassengerModel } from '../../models/passenger-model.model';
import { AvailableCabModel } from '../../models/available-cab-model.model';

export class travelHistory {
  driverName: string;
  driverPhoneNumber: number;
  carNumber: string;
  travelDate: string;
}

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

  access = 'Login';
  historyButtonText = 'Show History';
  tripStarted: string;
  loginToContinue = 'First Register a User and then Login to Continue';
  cabAvailMessage: string;

  logEmail: string;
  logMobile: string;

  loggedInUser: PassengerModel;

  passengerTravelHistory: travelHistory[] = [];

  constructor(private readonly cabservice: CabserviceService) { }

  onClose() {
    this.isInregisterMode = false;
  }
  onLoginClose() {
    this.isInLoginMode = false;
  }

  onUserLogin() {
    if (!this.loggedInUser) {
      this.isInLoginMode = true;
    }
    else {
      this.access = 'Login';
      this.loggedInUser = null;
      this.passengerTravelHistory = null;
    }
  }

  registerPassenger() {
    this.isInregisterMode = true;
  }


  onUserSignin() {
    console.log('email :' + this.logEmail);
    this.cabservice.passengerSignin({ email: this.logEmail, mobile: this.logMobile }).subscribe((passenger: PassengerModel) => {
      this.loggedInUser = passenger;
      this.isInLoginMode = false;
      this.access = 'Logout';
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
      if (result[0]) {
        this.assignedCab = result[0];
        this.tripStarted = 'Trip has started. Enjoy your Ride!';
      }
      else {
        this.cabAvailMessage = 'No Cabs Available!';
      }
    });
  }

  onTripEnd() {
    this.cabservice.addCurrentTravelDetail(this.loggedInUser.id, this.assignedCab).subscribe(result => {
      this.assignedCab = null;
      this.cabAvailMessage = null;
    });
  }

  showTravelHistory() {

    // console.log(response.headers.get('X-Custom-Header'));
    if (!this.passengerTravelHistory) {
      this.historyButtonText = 'Hide Travel History';
      this.cabservice.getRidesHistory(this.loggedInUser.id).subscribe((result: travelHistory[]) => {
        this.passengerTravelHistory = result;
      })
    }
    else {
      this.passengerTravelHistory = null;
      this.historyButtonText = 'Show History';
    }
  }

  ngOnInit(): void {
  }

}
