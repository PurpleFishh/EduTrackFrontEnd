import { Component, OnInit } from '@angular/core';
import { EventType, NavigationEnd, Router } from '@angular/router';
import { UserInfoDto } from 'src/app/core/models/user-info.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo: UserInfoDto | undefined;
  userAvatar: string = '';
  currentRoute: string = '';

  constructor(
    private readonly router: Router,
    public readonly auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((data) => {
      this.userInfo = data;
      this.userAvatar = (
        this.userInfo.firstName.slice(0, 1) + this.userInfo.lastName.slice(0, 1)
      ).toUpperCase();
    });
    this.router.events.subscribe((event) => {
      console.log(event);
      if (event.type === EventType.NavigationEnd) {
        if (
          event.urlAfterRedirects.split('?')[0].split('/')[1] === 'dashboard'
        ) {
          console.log(event.urlAfterRedirects);
          this.currentRoute =
            '/' + event.urlAfterRedirects.split('?')[0].split('/')[2];
          if (this.currentRoute === '/undefined') this.currentRoute = '/';

          console.log(this.currentRoute);
          console.log(this.isCurrentPage('/'));
        }
      }
    });
  }

  isCurrentPage(route: string): boolean {
    return this.currentRoute === route;
  }
  navigateTo(page: string): void {
    this.router.navigate([`/dashboard/${page}`]);
  }
  
}
