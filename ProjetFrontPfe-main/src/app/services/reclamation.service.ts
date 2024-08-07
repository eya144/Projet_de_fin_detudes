import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'https://codebackend-production.up.railway.app';

  constructor(private http:HttpClient) { }
  addreclamtion(tel:any,idagence:any,data:any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrl}/reclamations/${tel}/${idagence}`, data)

  }
 
}
