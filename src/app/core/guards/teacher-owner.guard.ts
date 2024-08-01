import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CoursesService } from '../services/courses.service';
import { map } from 'rxjs';

export const teacherCourseOwner: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);
  const course = inject(CoursesService);

  const courseId = route.params['curs']
    ? route.params['curs']
    : route.params['id'];
  if (courseId === undefined || courseId === null || courseId === '')
    return router.createUrlTree(['unauthorized']);
  if (!auth.isTeacher()) return router.createUrlTree(['unauthorized']);
  return course.isUserCourseOwner(courseId).pipe(
    map((isOwner) => {
      if (!isOwner) return router.createUrlTree(['unauthorized']);
      return true;
    }),
  );

};
