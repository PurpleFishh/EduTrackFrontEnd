import { Component, ErrorHandler } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if(error.status === 401)
    {
      console.log('Unauthorized');
      
    }
  }
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
})
export class MainLayoutComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;
  headerBlacklist = ['/login', '/register', '/add-teacher', '/recovery', '/resetpassword']
  footerBlacklist = ['/login', '/register', '/add-teacher', '/recovery', '/resetpassword']

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !this.headerBlacklist.includes(event.url.split('?')[0]);
        this.showFooter = !this.footerBlacklist.includes(event.url.split('?')[0]);
      }
    });
  }
}
