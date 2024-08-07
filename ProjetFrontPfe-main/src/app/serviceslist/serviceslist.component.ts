import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Observable, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare const L:any;

@Component({
  selector: 'app-serviceslist',
  templateUrl: './serviceslist.component.html',
  styleUrls: ['./serviceslist.component.css']
})
export class ServiceslistComponent implements OnInit {
  title = 'locationApp';
  searchTerm="";

  services:any;
  currentuser: any;
  messagesearch: any;
  data:any={textcolor:"",textbutton:""}
  constructor(private http:HttpClient,private service:ServicesService,private route :Router,private authservice : AuthService){
    
console.log(this.currentuser)
    if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution:
          
          {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18
          }
         
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>I am Here</b>').openPopup();

    });
  }
    this.watchPosition();
 
  }

  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
      (result: any) => {
        console.log(result);
        
      
        this.data = result;
        this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
      console.log(this.data)
      }
      
      );
    this.service.getServices() .subscribe(
      (response: any) => {
        console.log(response);
        this.services=response;
      },
      (error: any) => {
console.log(error.error);
        
        
      }
    );
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }


  getAgences(id:any)
  {
    this.route.navigate(['/agences/'+id])
  }



onSearchChange() {
  console.log(this.searchTerm);


  this.service.searchService(this.searchTerm.trim()).subscribe(
    (response: any) => {
      console.log(response);
      this.services = response;
      if(response.length==0)
      {
        this.messagesearch="No Service found in the name of "+this.searchTerm.trim()
this.ngOnInit();
          setTimeout(() => {
            this.messagesearch="",
          this.searchTerm=""}, 2000);
      }

    },
    (error: any) => {
      console.log(error.error);

    }
  );

}
gotoallAvis(key:any)
{
  this.route.navigate(['AvisService/'+key])
}
}