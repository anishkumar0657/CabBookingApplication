import { Injectable } from '@angular/core';
import { WebserviceService } from './webservice.service';

@Injectable({
  providedIn: 'root'
})
export class CabserviceService {

  constructor(private readonly webService: WebserviceService) { }

  updateCabLocation(id: number, payload) {
    return this.webService.post(`api/driver/${id}/updateLocation`, payload);
  }

  getAllDrivers() {
    return this.webService.get('api/driver/getAllDrivers');
  }

  registerDriver(payload) {
    console.log(payload);
    return this.webService.post('api/driver/register', payload);
  }

  switchDriverAvailability(payload) {
    return this.webService.put('api/driver/switchAvailability', payload);
  }

  registerPassenger(payload) {
    return this.webService.post('api/passenger/register', payload);
  }

  bookCab() {
    return this.webService.get('api/passenger/available_cabs');
  }

  getRidesHistory(id: number) {
    return this.webService.get(`api/passenger/getRideHistory/${id}`);
  }
}
