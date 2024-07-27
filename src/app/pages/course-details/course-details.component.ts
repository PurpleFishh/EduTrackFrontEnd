import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDisplayDto, CourseDto, CoursesFilter, CoursesFilterDto } from 'src/app/core/models/course.model';
import { LessonDisplayDto } from 'src/app/core/models/lesson.model';
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
  descriptionExpanded = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CoursesService,
    private readonly lessonService: LessonsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.courseService.getCourse(this.courseId).subscribe((course) => {
        this.course = course;

        let filter: CoursesFilter = {
          search: '',
          sortBy: '',
          categories: this.course.category,
          difficulties: '',
          prerequistes: []
        }
        this.courseService.getCourses(filter).subscribe((related) => {
          this.realtedCourses = related.filter((course) => course.name !== this.course.name).slice(0, 5);
        });
      });
      this.lessonService.getAllLessons(this.courseId).subscribe((lessons) => {
        this.lessons = lessons;
      });
      
    });
  }
}
