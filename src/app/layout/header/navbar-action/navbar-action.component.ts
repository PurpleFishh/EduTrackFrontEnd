import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navbar-action',
  templateUrl: './navbar-action.component.html',
  styleUrls: ['./navbar-action.component.scss']
})
export class NavbarActionComponent {
  isLogged = this.authService.isLogged();
  constructor(private readonly authService: AuthenticationService, private readonly router: Router) {}
  
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }

  logout(){ 
    this.authService.logout();
    this.navigate('');
    this.isLogged = this.authService.isLogged();
  }
}
