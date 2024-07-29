import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './update-lesson/update-lesson.component';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';

@NgModule({
  declarations: [LoginComponent, LandingpageComponent, UnauthorizedComponent, CoursesComponent, CourseComponent, LessonDetailsComponent, AddLessonComponent, UpdateLessonComponent, CheckAttendanceComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent],
  providers: [HttpClient],
})
export class PagesModule {}
