import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


const SOCKET_ENDPOINT = 'https://codebackend-production.up.railway.app/';

declare var device: { platform: any; };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'projet_front';
   getLocationBtn : any 
   data:any;
   notifications: string[] = [];
   private socket: any;
 
   constructor(private http: HttpClient,translate: TranslateService) {
    translate.addLangs(['En', 'Fr']);
    translate.setDefaultLang('En');
    translate.use('En');
    }

   ngOnInit() {
   this.requestLocationPermission();
}




  requestLocationPermission() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log(position)
          //console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not available');
    }
  }
  

}
