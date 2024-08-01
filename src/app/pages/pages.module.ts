import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HttpClient } from '@angular/common/http';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import { LessonDetailsTeacherComponent } from './lesson-details-teacher/lesson-details-teacher.component';
import { LessonNotFinishedDetailsComponent } from './lesson-not-finished-details/lesson-not-finished-details.component';
import { ViewAssignmentPageComponent } from './view-assignment-page/view-assignment-page.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './update-lesson/update-lesson.component';
import { LessonActionAreaComponent } from './lesson-details/lesson-action-area/lesson-action-area.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseActionAreaComponent } from './course-details/course-action-area/course-action-area.component';
import { LessonDisplayCardComponent } from './course-details/lesson-display-card/lesson-display-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashboardMainComponent } from './dashboard/dashboards/student-dashboard-main/student-dashboard-main.component';
import { StatisticComponent } from './dashboard/components/statistic/statistic.component';
import { LegendComponent } from './dashboard/components/legend/legend.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FbSubmitedComponent } from './fb-submited/fb-submited.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';
import { StudentDashboardAssignmentsComponent } from './dashboard/dashboards/student-dashboard-assignments/student-dashboard-assignments.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CoursePresentationComponent } from './main-page/course-presentation/course-presentation.component';
import { TestimonialCardsComponent } from './main-page/testimonial-cards/testimonial-cards.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TeacherDashboardCourseComponent } from './dashboard/dashboards/teacher-dashboard-course/teacher-dashboard-course.component';
import { FeedbackComponent } from './dashboard/dashboards/feedback/feedback.component';

@NgModule({
  declarations: [
    LoginComponent,
    UnauthorizedComponent,
    CoursesComponent,
    CourseComponent,
    LessonDetailsComponent,
    LessonDetailsTeacherComponent,
    LessonNotFinishedDetailsComponent,
    ViewAssignmentPageComponent,
    AddLessonComponent,
    UpdateLessonComponent,
    LessonActionAreaComponent,
    CourseDetailsComponent,
    CourseActionAreaComponent,
    LessonDisplayCardComponent,
    DashboardComponent,
    StudentDashboardMainComponent,
    StatisticComponent,
    LegendComponent,
    ContactUsComponent,
    AddCourseComponent,
    CheckAttendanceComponent,
    StudentDashboardAssignmentsComponent,
    MainPageComponent,
    CoursePresentationComponent,
    TestimonialCardsComponent,
    AboutUsComponent,
    RegisterUserComponent,
    RegisterTeacherComponent,
    RecoveryComponent,
    ResetPasswordComponent,
    FeedbackComponent,
    FbSubmitedComponent,
    ContactUsComponent,
    TeacherDashboardCourseComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent],
  providers: [HttpClient],
})
export class PagesModule {}
