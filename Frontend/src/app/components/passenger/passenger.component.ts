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
  passenger = new PassengerModel();

  constructor(private readonly cabservice: CabserviceService) { }

  onClose() {
    this.isInregisterMode = false;
  }
  registerPassenger() {
    this.isInregisterMode = true;
  }
  addNewPassenger() {
    this.cabservice.registerPassenger(this.passenger).subscribe(result => {
      console.log("passenger added");
      this.isInregisterMode = false;
    });
  }

  ngOnInit(): void {
  }

}
