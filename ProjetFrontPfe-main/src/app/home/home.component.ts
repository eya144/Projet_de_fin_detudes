import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  data:any
  constructor(private router: Router,private http:HttpClient) {

   }
  ngOnInit(): void {
     this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    console.log(this.data)
    }
    
    );
     }

  onAnimationEnd() {
    this.router.navigateByUrl('/home');
  }
  
}
