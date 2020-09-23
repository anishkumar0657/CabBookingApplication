import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class WebserviceService {
  readonly ROOT_URL: any;
  constructor(private readonly http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  //post function
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}/`, payload, httpOptions);
  }

  //get function
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, httpOptions);
  }

  //delete function
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`, httpOptions);
  }

  //put function
  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload, httpOptions);
  }
}
