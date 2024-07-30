import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { loggedGuard } from './core/guards/logged.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { userAdminGuard, userTeacherGuard } from './core/guards/user-role.guard';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';

const routes: Routes = [
   {
     path: '',
     component: MainLayoutComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'courses',
          component: CoursesComponent,
        },
        {
          path: 'course/:id',
          component: CourseDetailsComponent,
        },
        {
          path: 'edit/course/:id',
          component: AddCourseComponent,
          canActivate: [loggedGuard, userTeacherGuard]
        },
        {
          path: 'add/course',
          component: AddCourseComponent,
          canActivate: [loggedGuard, userTeacherGuard]
        },
        {
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        {
          path: '',
          component: LandingpageComponent,
          canActivate: [loggedGuard, userAdminGuard]
        },
        {
          path: '**',
          component: UnauthorizedComponent,
        }
      ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
