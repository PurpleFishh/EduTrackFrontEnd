import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDisplayDto, CourseDto, CoursesFilter, CoursesFilterDto } from 'src/app/core/models/course.model';
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
  descriptionExpanded = false;
  actionAreaHeight = 0;
  descriptionOverflow = true;
  

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
        if(document.getElementById('action-area'))
          this.actionAreaHeight = document.getElementById('action-area')!.offsetHeight;
        if(document.getElementById('description-text'))
        {  
          let descriptionText = document.getElementById('description-text')!;
          console.log(descriptionText, descriptionText.offsetHeight, descriptionText.scrollHeight);
          this.descriptionOverflow = descriptionText.offsetHeight  < descriptionText.scrollHeight;
        }

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
