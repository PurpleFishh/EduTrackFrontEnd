import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent {

  currentRoute: string = '';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.currentRoute = "/"+ this.router.url.split('?')[0].split('/')[1];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.currentRoute = "/"+ event.urlAfterRedirects.split('?')[0].split('/')[1];
    });
  }

  changeBackgroundColor() {
    console.log(this.currentRoute);
    if(this.currentRoute == "/main") {
      console.log('main');
      return {
        'background-color': '#FAFCFC',
       // 'font-color': '#050B0C'
        }
    }
    else return {
      'background-color': '#002333',
     // 'color': '#FAFCFC'
    };

  }

  changeColor() {
    console.log(this.currentRoute);
    if(this.currentRoute == "/main") {
      console.log('main');
      return {
         'color': '#050B0C'
        }
    }
    else return {

      'color': '#FAFCFC'
    };
  }

    isWhitePictureNeeded()
    {
      console.log(this.currentRoute);
      if(this.currentRoute == "/main") 
        return false;
      else return true;
    }

  
}
