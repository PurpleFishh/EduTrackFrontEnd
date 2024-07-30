import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CoursesService } from '../services/courses.service';

export const teacherCourseOwner: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);
  const course = inject(CoursesService);

  if(auth.isAdmin()) {
    return true
  }
  return router.createUrlTree(['unauthorized']);
};