import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseActionAreaComponent } from './course-details/course-action-area/course-action-area.component';
import { LessonDisplayCardComponent } from './course-details/lesson-display-card/lesson-display-card.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [LoginComponent, LandingpageComponent, UnauthorizedComponent, CoursesComponent, CourseComponent, CourseDetailsComponent, CourseActionAreaComponent, LessonDisplayCardComponent, ContactUsComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent],
  providers: [HttpClient],
})
export class PagesModule {}
