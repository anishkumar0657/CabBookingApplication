import { Component, Inject, OnInit } from '@angular/core';
import { DriverModel } from '../../models/driver-model.model';
import { CabserviceService } from '../../services/cabservice.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  lat: number;
  long: number;
  name: string;
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})

export class DriverComponent implements OnInit {

  isInregisterMode = false;
  driver = new DriverModel();
  availableDrivers: DriverModel[] = [];
  dataSource;
  lat: number;
  long: number;

  constructor(private readonly cabservice: CabserviceService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'license', 'carNumber', 'action'];

  registerDriver() {
    this.isInregisterMode = true;
  }

  onClose() {
    this.isInregisterMode = false;
    this.resetDriverRegisterationFormData();

  }

  resetDriverRegisterationFormData() {
    this.driver = null;
  }
  addNewDriver() {
    this.cabservice.registerDriver(this.driver).subscribe(result => {
      this.getAllAvailableDrivers();
      this.isInregisterMode = false;
      this.resetDriverRegisterationFormData();
    });
  }

  getAllAvailableDrivers() {
    this.cabservice.getAllDrivers().subscribe((drivers: DriverModel[]) => {
      this.availableDrivers = drivers;
      this.dataSource = drivers;
    });
  }

  onStatusChange(id: number) {
    this.cabservice.switchDriverAvailability(id).subscribe((result: DriverModel[]) => {
      this.getAllAvailableDrivers();
    });
  }


  onLocationUpdate(id: number, name: string) {

    const dialogRef = this.dialog.open(UpdateLocationDialog, {
      width: '300px',
      data: { name: name, lat: this.lat, long: this.long }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.lat = result.lat;
      this.long = result.long;
      console.log(this.lat);
      console.log(this.long);
      this.cabservice.updateCabLocation(id, { latitude: this.lat, longitude: this.long }).subscribe(result => {
        console.log('location updated successfully');
        this.lat = null;
        this.long = null;
      });
    });
  }

  ngOnInit(): void {
    this.getAllAvailableDrivers();
  }

}

@Component({
  selector: 'update-location-dialog',
  templateUrl: 'update-location-dialog.html',
})
export class UpdateLocationDialog {

  constructor(
    public dialogRef: MatDialogRef<UpdateLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}