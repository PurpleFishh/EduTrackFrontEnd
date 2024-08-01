import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
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
  
    if(this.currentRoute == "/") {
      return {
        'background-color': '#FAFCFC',
        }
    }
    else return {
      'background-color': '#002333',
    };

  }

  changeColor() {
   
    if(this.currentRoute == "/") {
     
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
      
      if(this.currentRoute == "/") 
        return false;
      else return true;
    }
    navigate(path: string) {
      this.router.navigateByUrl(path);
    }

  
}
