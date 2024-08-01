import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CoursePresentationComponent } from './main-page/course-presentation/course-presentation.component';
import { TestimonialCardsComponent } from './main-page/testimonial-cards/testimonial-cards.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';

@NgModule({
  declarations: [LoginComponent, UnauthorizedComponent, CoursesComponent, CourseComponent, MainPageComponent, CoursePresentationComponent, TestimonialCardsComponent, RegisterUserComponent, RegisterTeacherComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent],
  providers: [HttpClient],
})
export class PagesModule {}
