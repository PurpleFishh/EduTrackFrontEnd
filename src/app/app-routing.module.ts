import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentDashboardMainComponent } from './pages/dashboard/dashboards/student-dashboard-main/student-dashboard-main.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { LessonDetailsComponent } from './pages/lesson-details/lesson-details.component';
import { CourseComponent } from './pages/courses/course/course.component';
import { LessonDetailsTeacherComponent } from './pages/lesson-details-teacher/lesson-details-teacher.component';
import { LessonNotFinishedDetailsComponent } from './pages/lesson-not-finished-details/lesson-not-finished-details.component';
import { ViewAssignmentPageComponent } from './pages/view-assignment-page/view-assignment-page.component';
import { UpdateLessonComponent } from './pages/update-lesson/update-lesson.component';
import { AddLessonComponent } from './pages/add-lesson/add-lesson.component';
import { userAdminGuard, userTeacherGuard } from './core/guards/user-role.guard';
import { CheckAttendanceComponent } from './pages/check-attendance/check-attendance.component';
import { StudentDashboardAssignmentsComponent } from './pages/dashboard/dashboards/student-dashboard-assignments/student-dashboard-assignments.component';
import { teacherCourseOwner } from './core/guards/teacher-owner.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { loggedGuard } from './core/guards/logged.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';

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
        path: 'course/:curs/lesson/:lesson/grade',
        component: ViewAssignmentPageComponent,
        canActivate: [loggedGuard],
      },
      {
        path:'course/:curs/lesson/:lesson/check-attendance',
        component:CheckAttendanceComponent,
        canActivate: [loggedGuard, teacherCourseOwner],
      },
      {
        path: 'course/:curs/lesson/:lesson',
        component: LessonDetailsComponent,
        canActivate: [loggedGuard],
      },
      {
        path: 'course/:id',
        component: CourseDetailsComponent,
      },
      {
        path: 'edit/course/:curs/lesson/:lesson',
        component: AddLessonComponent,
        canActivate: [loggedGuard],
      },
      {
        path: 'edit/course/:id',
        component: AddCourseComponent,
        canActivate: [loggedGuard, teacherCourseOwner],
      },
      {
        path: 'add/course/:curs/lesson',
        component: AddLessonComponent,
        canActivate: [loggedGuard],
      },
      {
        path: 'add/course',
        component: AddCourseComponent,
        canActivate: [loggedGuard, userTeacherGuard],
      },
      {
        path: 'update-lesson',
        component: UpdateLessonComponent,
        canActivate: [loggedGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: StudentDashboardMainComponent,
          },
          {
            path: 'student-dashboard-assignments',
            component: StudentDashboardAssignmentsComponent,
          },
        ],
      },
      {
        path:'about',
        component: AboutUsComponent
      },
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: '**',
        component: UnauthorizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
