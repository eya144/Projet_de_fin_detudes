import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencesService {
  constructor(private http: HttpClient) { }
  getDetailsHoraires(code_Agence:any)
  {
    return this.http.get(`https://codebackend-production.up.railway.app/agences/${code_Agence}/horaires`);
  
  }
  getagenceparservice(key:any) {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${key}`);
  }
  getAllagence(){
    return this.http.get<any>('https://codebackend-production.up.railway.app/agences');

  } 
  getAgencedetails(val:any){
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agence/details/${val}`);

  }
  searchAgence(service:any,val:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/libelle/${service}/${val}`);

  }
  searchAgenceparVille(service:any,ville:any) {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/ville/${service}/${ville}`);
  }
  searchAgenceparGouvernorat(service:any,gouvernorat:any) {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/gouvernorat/${service}/${gouvernorat}`);
  }
  searchAgenceparVilleLibelle(service:any,libelle:any,ville:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${service}/${libelle}/${ville}`);
 
  }
  searchAgenceparVilleGouvernorat(service:any,city:any,gouvernorat:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${service}/ville/${city}/gouvernorat/${gouvernorat}`);
 
  }
  searchAgenceparLibelleGouvernorat(service:any,libelle:any,gouvernorat:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${service}/libelle/${libelle}/gouvernorat/${gouvernorat}`);
 
  }
  
  searchAgenceparLibelleVilleGouvernorat(service:any,libelle:any,city:any,gouvernorat:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${service}/libelle/${libelle}/ville/${city}/gouvernorat/${gouvernorat}`);
 
  }
  AgencesNearMe(service:any,latitude:any,longitude:any)
  {
    return this.http.get<any>(`https://codebackend-production.up.railway.app/agences/${service}/latitude/${latitude}/longitude/${longitude}`);
 
  }
  getServicesBycodeAgence(code:any)
  {
    return this.http.get(`https://codebackend-production.up.railway.app/servicesByAgence/${code}`);
  }
 }
