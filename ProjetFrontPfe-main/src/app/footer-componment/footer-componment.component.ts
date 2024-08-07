import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-componment',
  templateUrl: './footer-componment.component.html',
  styleUrls: ['./footer-componment.component.css']
})
export class FooterComponmentComponent {
  Lang:any="En";
  constructor(translate: TranslateService){
    this.Lang = localStorage.getItem("selectedLanguage") || "En";
    translate.use(this.Lang);
  }
  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    console.log(lang)
    localStorage.setItem("selectedLanguage",lang);
    window.location.reload();
  }

}
