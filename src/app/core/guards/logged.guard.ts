import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);

  if(auth.isLogged()) {
    return true
  }
  return router.createUrlTree(['unauthorized']);
};
