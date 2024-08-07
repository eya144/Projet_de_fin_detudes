import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://codebackend-production.up.railway.app';

  constructor(private http: HttpClient) {
  }

login(telephone: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { telephone, password })

  }
addSession(telephone:string)
{
  const body={
    telephone:telephone
  }
  return this.http.post<any>(`${this.apiUrl}/session`,body)

}
updateSession(telephone:any)
{
  const body={
    telephone:telephone
  }
return this.http.put<any>(`${this.apiUrl}/session/end`,body)
}
forgetPassword(telephone: string, password: string)
{
  return this.http.put<any>(`${this.apiUrl}/clientPassword/${telephone}`, { telephone, password })

}
RecoverPassword(phone: string)
{
  return this.http.put<any>(`${this.apiUrl}/RecoverPassword/${phone}`, { phone })

}
VerifyRecoverCode(phone: string,code :string)
{
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let params = new HttpParams().set("phone",phone).set("code", code);
  return this.http.get<any>(`${this.apiUrl}/VerifyRecoverCode/${phone}/${code}`,  { headers: headers, params: params})
}
getClientDataFromToken()
{
  let token = localStorage.getItem('token');
  if(token){
    let data=JSON.parse(window.atob(token.split('.')[1]))
    return data;
  }
}

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(token){
      return true;
    }
    else{
      return false;
    }
  }


  sendVerificationCode(email: string,telephone:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-verification-code`, { email ,telephone});
  }

  register(client:any) {
    return this.http.post<any>(`https://codebackend-production.up.railway.app/register`,client);
  }


  getClient(tel: any) {
    return this.http.get(`https://codebackend-production.up.railway.app/client/${tel}`);
  }
  updateClient(data:any) {
    return this.http.put(`https://codebackend-production.up.railway.app/client/${data.get('telephone')}`, data);
  }
  async SendRDVEmailNotif(data:any) {
    return await this.http.post<any>(`${this.apiUrl}/SendRDVEmailNotif`, data).subscribe(data => {
      console.log("SendRDVEmailNotif")
  });
  }
  async SendRDVEmailNotifDelete(email:any,serviceName:any) {
    return await this.http.post<any>(`${this.apiUrl}/SendRDVEmailNotifDelete`, {email : email,serviceName:serviceName}).subscribe(data => {
      console.log("SendRDVEmailNotifDelete")
  });
  }
  deleteCompte(tel: any) {
    return this.http.delete(`https://codebackend-production.up.railway.app/client/${tel}`);

  }
}


