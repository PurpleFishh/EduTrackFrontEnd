import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonStatus } from 'src/app/core/models/lesson.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';

@Component({
  selector: 'app-lesson-action-area',
  templateUrl: './lesson-action-area.component.html',
  styleUrls: ['./lesson-action-area.component.scss'],
})
export class LessonActionAreaComponent implements OnInit {
  currentGrade: string = '-';
  @Input() isTeacher = false;
  @Input() lessonStatus: LessonStatus | undefined;
  @Input() lessonId: string | undefined;

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @Output() deleteLesson: EventEmitter<any> = new EventEmitter();
  @Output() deleteAssignment: EventEmitter<any> = new EventEmitter();
  @Output() editLesson: EventEmitter<any> = new EventEmitter();

  allLessonStatus = LessonStatus;

  constructor(
    private readonly lessonSevice: LessonsService,
    private readonly assService: AssignmentInventoryService,
    private readonly router: Router,
    private readonly routerActive: ActivatedRoute,

  ) {}

  ngOnInit()
  {
    this.routerActive.params.subscribe((params) => {
      if (!params['curs']) {
        this.router.navigateByUrl('/courses');
        return;
      }
      if (!params['lesson']) {
        this.router.navigateByUrl('/course/' + params['curs']);
        return;
      }
      const courseId = params['curs'];
      const lessonId = params['lesson'];
      this.assService
        .getGrade(courseId, lessonId)
        .subscribe((grade) => {
          this.currentGrade = grade as string;
        });
    });
  }

  goToAttendanceChecker()
  {
    this.router.navigateByUrl(`${this.router.url}/check-attendance`);
  }

  confirmDelete(): void {
    const result = window.confirm(
      'Select ok to delete lesson or cancel to delete assignment'
    );
  }

  
}
