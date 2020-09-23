import { Injectable } from '@angular/core';
import { WebserviceService } from './webservice.service';

@Injectable({
  providedIn: 'root'
})
export class CabserviceService {

  constructor(private readonly webService: WebserviceService) { }

  updateCabLocation(id: number, payload) {
    return this.webService.post(`api/driver/updateLocation/${id}`, payload);
  }

  getAllDrivers() {
    return this.webService.get('api/driver/getAllDrivers');
  }

  registerDriver(payload: object) {
    return this.webService.post('api/driver/register', payload);
  }

  switchDriverAvailability(id: number) {
    return this.webService.get(`api/driver/switchAvailability/${id}`);
  }

  registerPassenger(payload: object) {
    return this.webService.post('api/passenger/register', payload);
  }

  bookCab(payload: object) {
    return this.webService.post('api/passenger/available_cabs', payload);
  }

  getRidesHistory(id: number) {
    return this.webService.get(`api/passenger/getRideHistory/${id}`);
  }

  addCurrentTravelDetail(id: number, payload: object) {
    return this.webService.post(`api/passenger/addCurrentTravelDetail/${id}`, payload);
  }
  
  passengerSignin(payload: object) {
    return this.webService.post('api/passenger/signin', payload);
  }
}
