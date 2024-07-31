import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LessonStatus } from 'src/app/core/models/lesson.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';

@Component({
  selector: 'app-lesson-action-area',
  templateUrl: './lesson-action-area.component.html',
  styleUrls: ['./lesson-action-area.component.scss'],
})
export class LessonActionAreaComponent {
  @Input() currentGrade: string | undefined;
  @Input() isTeacher = false;
  @Input() lessonStatus: LessonStatus | undefined;
  @Input() lessonId: string | undefined;

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();

  allLessonStatus = LessonStatus;

  constructor(
    private readonly lessonSevice: LessonsService,
    private readonly assService: AssignmentInventoryService,
    private readonly router: Router
  ) {}

  goToEditLesson() {
    this.router.navigateByUrl('/update-lesson');
  }

  confirmDelete(): void {
    const result = window.confirm(
      'Select ok to delete lesson or cancel to delete assignment'
    );

    if (result) {
      this.deleteLesson();
    } else {
      this.deleteAssignment();
    }
  }

  deleteLesson() {
    this.lessonSevice.deleteLesson().subscribe(
      (response) => console.log('Delete response:', response),
      (error) => console.error('Delete error:', error)
    );
    window.location.reload();
  }

  deleteAssignment() {
    this.assService.deleteAssignment().subscribe(
      (response) => console.log('Delete response:', response),
      (error) => console.error('Delete error:', error)
    );
    window.location.reload();
  }
}
