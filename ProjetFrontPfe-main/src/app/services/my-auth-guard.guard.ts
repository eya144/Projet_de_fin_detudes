import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {


 
    constructor(private myService: AuthService, private router: Router) {}

    canActivate(): boolean {
      const isConnected = this.myService.isLoggedIn();
      if (!isConnected) {
        this.router.navigate(['/login']);
      }
      return isConnected;
    }
    
  }  


