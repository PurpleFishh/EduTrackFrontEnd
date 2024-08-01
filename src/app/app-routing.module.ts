import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterTeacherComponent } from './pages/register-teacher/register-teacher.component';

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
          path: 'main',
          component: MainPageComponent
        },
        {
          path: 'add-teacher',
          component: RegisterTeacherComponent
        },
        {
          path: 'register',
          component: RegisterUserComponent
        },
        {
          path: '',
          component: MainPageComponent
        },
        {
          path: 'unauthorized',
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
