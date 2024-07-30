import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;
  headerBlacklist = ['/login', '/recovery', '/resetpassword']
  footerBlacklist = ['/login', '/recovery', '/resetpassword']

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !this.headerBlacklist.includes(event.url.split('?')[0]);
        this.showFooter = !this.footerBlacklist.includes(event.url.split('?')[0]);
      }
    });
  }
}
