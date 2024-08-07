import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  codeverif: any;
  private currentUser: any;
  private isConnected: boolean = false;
  constructor(private http: HttpClient) { }
  
  async createUser(userData : any) {
    // Les paramètres nécessaires pour créer un compte utilisateur
  
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authHeader 
      })
    };
 
    const formData = new FormData();
    formData.append('nom', userData.lname);
    formData.append('prenom', userData.fname);
    formData.append('id_client', userData.phone);
    formData.append('telephone', userData.phone);
    formData.append('email', userData.email);
    
    formData.append('date_naissance', userData.birthdate);
    formData.append('photo', userData.file);
    formData.append('token',"ctKaD7IHbxU")
// Loop through the form data and log the key-value pairs

    // Effectuer la requête HTTP POST vers l'URL de l'API

  try {
    const response = await this.http.post('http://wsmobile.expressdisplay.net/v1/compte', formData, httpOptions).toPromise();
    console.log('Compte created successfully:', response);
  } catch (error) {
    console.log('Error occurred:', error);
  }
}
  verifcodeverification(codeinput:any,codesend:any)
  {let test=true;
    console.log(codeinput,codesend);
    if (codeinput != codesend) {
      test = false;
    }
  
  
    
  
    return test;
  }
  getUser(id:any) {
    // Les paramètres nécessaires pour créer un compte utilisateur
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    console.log(currentUser);
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader 
      })
    };
  
    // Effectuer la requête HTTP POST vers l'URL de l'API
    return this.http.get(`http://wsmobile.expressdisplay.net/v1/comptebyid/${currentUser.id}`, httpOptions)
      
  }
  async login(tel: any) {
    let test: boolean;
    const usernam = 'admin';
    const pass = 'expressmobile$$2018';
    const authString = `${usernam}:${pass}`;
    const authHeader = `Basic ${btoa(authString)}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authHeader 
      })
    };
    
    try {
      const response = await this.http.get(`http://wsmobile.expressdisplay.net/v1/compte/${tel.phone}`, httpOptions).toPromise();
      console.log('Logged in successfully');
      test = true;
      this.currentUser = response;
      this.isConnected = true;
    } catch (error) {
      console.log('Error occurred:', error);
      test = false;
    }
    
    return test;
  }
  
  async updateUser(userData: any) {
    let test: boolean;
    const usernam = 'admin';
    const pass = 'expressmobile$$2018';
    const authString = `${usernam}:${pass}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authHeader
      })
    };
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('telephone', userData.telephone);
    formData.append('nom', userData.lastname);
    formData.append('prenom', userData.firstname);
    formData.append('id_client', userData.telephone);
    formData.append('token', 'ctKaD7IHbxU');
    formData.append('date_naissance', userData.birthdate);
  
    try {
      const response = await this.http.post(`http://wsmobile.expressdisplay.net/v1/compte`, formData, httpOptions).toPromise();
      console.log('User updated successfully:', response);
      this.currentUser = response;
      test = true; // set showvalid to true on successful form submission
    } catch (error) {
      console.log('Error occurred:', error);
      test = false; // set showvalid to false on failed form submission
    }
  console.log(test)
    return test;
  }
  getCurrentUser() {
    return this.currentUser;
  }

  isConnectedd(){
    return this.isConnected;
  }

  logout() {
    this.currentUser = null;
    this.isConnected = false;
  }
  sendMessagePhone(phoneNumber: any,verificationCode:any) {
    const formData = new FormData();
    formData.append('tel', phoneNumber);
    formData.append('msg', verificationCode);
    const url = 'http://sms.expressdisplay.net/v1/sendsms';

    const message = `Your verification code is ${verificationCode}`;
  
    this.http.post(url,formData).subscribe(
      (response) => {
        console.log('Message sent successfully');
        console.log(verificationCode);
      },
      (error) => {
        console.error('Failed to send message:', error);
        
      }
    );
  
  }
 sendMessage(email:any,phone:any)
 {
  const verificationCode=this.generateVerificationCode().toString();
  this.sendMessageEmail(email,verificationCode)
  this.sendMessagePhone(phone,verificationCode);
  return verificationCode;


 }
  sendMessageEmail(email: any,verificationCode:any) {
     
      const formData = new FormData();
      formData.append('mail', email);
      formData.append('from', "test.e@expressdisplay.net");
      formData.append('subject', "Verification Code");

      formData.append('msg', verificationCode);
      const url = 'http://email.expressdisplay.net/v1/sendmail';
  
      const message = `Your verification code is ${verificationCode}`;
    
      this.http.post(url,formData).subscribe(
        (response) => {
          console.log('Message sent successfully');
          console.log(verificationCode);
        },
        (error) => {
          console.error('Failed to send message:', error);
          
        }
      );
    
  
    }
  getNearagences(latitude:any,longitude:any) {
    // Les paramètres nécessaires pour créer un compte utilisateur
  
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader 
      })
    };

    // Effectuer la requête HTTP POST vers l'URL de l'API
   return this.http.get<any>(`http://wsmobile.expressdisplay.net/v1/agences/${latitude}/${longitude}`, httpOptions)
      
  }
  getAllAgences(): Observable<any> {
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP GET
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader 
      })
    };
    return this.http.get<any>('http://wsmobile.expressdisplay.net/v1/allagences', httpOptions);
  }
  getAgenceByNum(id:any): Observable<any> {
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP GET
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader 
      })
    };
    return this.http.get<any>('http://wsmobile.expressdisplay.net/v1/agence/'+id, httpOptions);
  }

async saveNote(userData:any){
    // Les paramètres nécessaires pour créer un compte utilisateur
let test=false
    const username = 'admin';
    const password = 'expressmobile$$2018';
    const authString = `${username}:${password}`;
    const authHeader = `Basic ${btoa(authString)}`;
    // Les options pour la requête HTTP POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authHeader 
      })
    };
 
  const formData = new FormData();
  
  formData.append('id_client', userData.id_client);
  formData.append('id_agence', userData.id_agence);
  formData.append('commentaire', userData.commentaire);

  formData.set('etoile', userData.etoile);

   try{
    const response = await this.http.post(`http://wsmobile.expressdisplay.net/v1/note`,formData, httpOptions).toPromise();
   console.log('Note  saved :', response);
   
   test = true; // set showvalid to true on successful form submission
 } catch (error) {
  console.log('Erreur lors de la création du Note :');
   test = false; // set showvalid to false on failed form submission
 }
console.log(test)
 return test;
}

  generateVerificationCode() {
    const code =Math.floor(Math.random() * 900000) + 100000;
console.log("codeverif funvtion",code)
    this.codeverif=code;
    return code;

  }

}
