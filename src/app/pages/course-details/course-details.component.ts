import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CoursesService,
    private readonly lessonService: LessonsService,
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
            .slice(0, 5);
        });
      });
      this.lessonService.getAllLessons(this.courseId).subscribe((lessons) => {
        this.lessons = lessons;
        this.lessons.forEach(
          (lesson) => (lesson.startDate = new Date(lesson.startDate))
        );
        this.lessons = this.lessons.sort(
          (a, b) => b.startDate.getTime() - a.startDate.getTime()
        );
        this.thisWeekLesson = this.lessons.filter((lesson) => {
          return lesson.startDate > new Date();
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
}