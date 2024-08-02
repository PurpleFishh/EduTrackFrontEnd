import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  CourseDisplayDto,
  CourseDto,
  CoursesFilter,
  CoursesFilterDto,
} from 'src/app/core/models/course.model';
import { LessonDisplayDto } from 'src/app/core/models/lesson.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  courseId: string = '';
  course!: CourseDto;
  realtedCourses: CourseDisplayDto[] = [];
  lessons: LessonDisplayDto[] = [];
  thisWeekLesson: LessonDisplayDto | undefined;
  descriptionExpanded = false;
  actionAreaHeight = 0;
  descriptionOverflow = true;
  isEnrolled = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly auth: AuthenticationService,
    private readonly courseService: CoursesService,
    private readonly lessonService: LessonsService,
    private readonly snackBar: MatSnackBar,
    private readonly navigator: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.courseService.getCourse(this.courseId).subscribe((course) => {
        this.course = course;
        if (document.getElementById('action-area'))
          this.actionAreaHeight =
            document.getElementById('action-area')!.offsetHeight;
        if (document.getElementById('description-text')) {
          let descriptionText = document.getElementById('description-text')!;
          this.descriptionOverflow =
            descriptionText.offsetHeight < descriptionText.scrollHeight;
        }

        let filter: CoursesFilter = {
          search: '',
          sortBy: '',
          categories: this.course.category,
          difficulties: '',
          prerequistes: [],
        };
        this.courseService.getCourses(filter).subscribe((related) => {
          this.realtedCourses = related
            .filter((course) => course.name !== this.course.name)
            .slice(0, 4);
        });

        this.courseService
          .isStudentEnrolled(this.course.name)
          .subscribe((isEnrolled) => {
            this.isEnrolled = isEnrolled;
          });
      });
      this.lessonService.getAllLessons(this.courseId).subscribe((lessons) => {
        this.lessons = lessons;
        this.lessons.forEach(
          (lesson) => (lesson.startDate = new Date(lesson.startDate))
        );
        this.lessons = this.lessons.sort(
          (a, b) => a.startDate.getTime() - b.startDate.getTime()
        );
        this.thisWeekLesson = this.lessons.filter((lesson) => {
          return lesson.startDate.getDate() + (lesson.startDate.getMonth()  * 30) >= new Date().getDate() + (new Date().getMonth() * 30);
        })[0];
      });
    });
  }

  goToWeekLesson() {
    if (this.thisWeekLesson) {
      this.navigator.navigateByUrl(
        `${this.navigator.url}/lesson/${this.thisWeekLesson?.name}`
      );
      window.scrollTo(0, 0);
    }
  }

  startLesson(lessonTitle: string) {
    if (!this.auth.isLogged()) {
      this.navigator.navigateByUrl('/login');
      return;
    }
    if (!this.auth.isTeacher() && !this.isEnrolled) {
      this.snackBar.open(`Please first enrolle into the course!`, 'Close');
      return;
    }
    this.navigator.navigateByUrl(`${this.navigator.url}/lesson/${lessonTitle}`);
    window.scrollTo(0, 0);
  }

  enrollToCourse() {
    this.isEnrolled = true;
  }
}
