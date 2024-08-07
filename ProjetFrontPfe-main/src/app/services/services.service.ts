import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<any>('https://codebackend-production.up.railway.app/distinctservices');
  }
  getDetailsServiceParAgence(code:any,name:any) {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/servicesByAgence/${code}/${name}`);
  }
  searchService(service:any)
  { 
    return this.http.get<any>(`https://codebackend-production.up.railway.app/services/${service}`);

  }
}
