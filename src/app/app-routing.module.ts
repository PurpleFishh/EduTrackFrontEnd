import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { loggedGuard } from './core/guards/logged.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LessonDetailsComponent } from './pages/lesson-details/lesson-details.component';
import { AddLessonComponent } from './pages/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './pages/update-lesson/update-lesson.component';
import { CheckAttendanceComponent } from './pages/check-attendance/check-attendance.component';

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
          path: 'lesson-details',
          component: LessonDetailsComponent,
        },
        {
          path:'add-lesson',
          component: AddLessonComponent
        },
        {
          path:'update-lesson',
          component: UpdateLessonComponent
        },
        {
          path:'check-attendance',
          component: CheckAttendanceComponent
        },
        {
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        {
          path: '',
          component: LandingpageComponent,
          canActivate: [loggedGuard]
        }
      ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
