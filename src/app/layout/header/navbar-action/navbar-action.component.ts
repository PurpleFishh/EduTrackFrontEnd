import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navbar-action',
  templateUrl: './navbar-action.component.html',
  styleUrls: ['./navbar-action.component.scss']
})
export class NavbarActionComponent {
  constructor(private readonly authService: AuthenticationService) {}

  isLogged = this.authService.isLogged();
}
