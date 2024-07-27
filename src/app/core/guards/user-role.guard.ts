import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const userAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);

  if(auth.isAdmin()) {
    return true
  }
  return router.createUrlTree(['unauthorized']);
};

export const userTeacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);

  if(auth.isTeacher()) {
    return true
  }
  return router.createUrlTree(['unauthorized']);
};
