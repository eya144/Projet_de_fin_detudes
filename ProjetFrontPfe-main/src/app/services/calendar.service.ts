import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
 

  
  constructor(private http: HttpClient) { }
  
 
async fetchDataFromServer(codes:any,codea:any)
{
  codea =codea.replace(/\s/g, ''); // Remove spaces from codea


  console.log(codes,codea)
  const usernam = codes+'.'+codea;
  const pass = 'expressexpress1+';
  const authString = `${usernam}:${pass}`;
  const authHeader = `Basic ${btoa(authString)}`;
  // Les options pour la requête HTTP POST
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': authHeader
    })
  };
  let response: any;
  try {
    response = await this.http.get('http://196.203.214.86/api/v2.0/me/CalendarView?startDateTime=2010-01-01T08:00:00Z&endDateTime=2050-01-01T23:59:59Z&$top=10000', httpOptions).toPromise();
    console.log('calendar');
  
    console.log(response);
    return response; // return only the 'value' property

    
  } catch (error) {
    console.log('Error occurred:', error);
    return null;
  }
}
async addDataFromServer(codea:any,codes:any,data:any)
{
  codes =codes.replace(/\s/g, ''); // Remove spaces from codea

  const usernam = codea+'.'+codes;
  const pass = 'expressexpress1+';
  const authString = `${usernam}:${pass}`;
  const authHeader = `Basic ${btoa(authString)}`;
  // Les options pour la requête HTTP POST
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': authHeader
    })
  };
  let response: any;
  try {
     response = await this.http.post('http://196.203.214.86/api/v2.0/me/events', data,httpOptions).toPromise();
    console.log('calendar');
  
    console.log(response);
    return response; // return only the 'value' property

    
  } catch (error) {
    console.log('Error occurred:', error);
    return null;
  }
}

deleteDataFromServer(codea:any,codes:any,id: any) {
  codes =codes.replace(/\s/g, ''); // Remove spaces from codea

  const usernam = codea+'.'+codes;
  const pass = 'expressexpress1+';
  const authString = `${usernam}:${pass}`;
  const authHeader = `Basic ${btoa(authString)}`;
  // Les options pour la requête HTTP DELETE
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': authHeader
    })
  };

  return this.http.delete(`http://196.203.214.86/api/v2.0/me/events/${id}`, httpOptions);
}
async checkRdvAvailable(agence:any,time:any,day:any) {
  let body ={
    "agence": agence,
    "time": time+"",
    "day": day
  }
  return await this.http.post(`https://codebackend-production.up.railway.app/checkRdvAvailable`, body)
}


}