import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepondService {

  private apiUrl = 'https://codebackend-production.up.railway.app';

  constructor(private http:HttpClient) { }
  updateView(id_reponse:any) 
  {const body={
    code_Reponse:id_reponse
  }
    return this.http.put(`${this.apiUrl}/reponseviewupdate`, body)

  }
 
}
