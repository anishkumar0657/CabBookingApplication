import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../../services/cabservice.service';
import { PassengerModel } from '../../models/passenger-model.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  isInregisterMode = false;
  isInLoginMode = false;
  passenger = new PassengerModel();

  loggedInUser: PassengerModel = {id: 1,
    name: "anish",
    email: "a@g.com",
    phoneNumber: 7894562158};

  constructor(private readonly cabservice: CabserviceService) { }

  onClose() {
    this.isInregisterMode = false;
  }

  onUserLogin() {
    this.isInLoginMode = true;
  }

  onLoginClose(){
    this.isInLoginMode = false;
  }

  registerPassenger() {
    this.isInregisterMode = true;
  }

  addNewPassenger() {
    this.cabservice.registerPassenger(this.passenger).subscribe(result => {
      console.log("Rider successfully registered");
      this.isInregisterMode = false;
    });
  }

  showTravelHistory() {
    console.log('history clicked');
  }

  ngOnInit(): void {
  }

}
