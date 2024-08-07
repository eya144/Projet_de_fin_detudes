import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'https://codebackend-production.up.railway.app';

  constructor(private http: HttpClient) { }
  addavis(tel:any,idservice:any,commentaire:any,etoile:any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/avis/${tel}/${idservice}`, { commentaire, etoile})

  }
}
