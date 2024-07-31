import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { loggedGuard } from './core/guards/logged.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { userAdminGuard } from './core/guards/user-role.guard';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FbSubmitedComponent } from './pages/fb-submited/fb-submited.component';

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
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        {
          path: '',
          component: LandingpageComponent,
          canActivate: [loggedGuard, userAdminGuard]
        },
        {
          path: 'contact',
          component: ContactUsComponent
        },
        {
          path: '10q4urfb',
          component: FbSubmitedComponent
        },
      ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
