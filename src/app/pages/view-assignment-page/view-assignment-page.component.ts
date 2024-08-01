import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AssignmentDisplayDto,
  AssignmentSolutionDto,
  Grade,
} from 'src/app/core/models/assignment.model';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { LessonDisplayDto, LessonDto } from 'src/app/core/models/lesson.model';
import { LoginDto } from 'src/app/core/models/login.model';
import { ResultError, StatusCodes } from 'src/app/core/models/result.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-assignment-page',
  templateUrl: './view-assignment-page.component.html',
  styleUrls: ['./view-assignment-page.component.scss'],
})
export class ViewAssignmentPageComponent {
  current_assignment: AssignmentDisplayDto[] = [];
  current_lesson!: LessonDisplayDto;
  current_course!: CourseDisplayDto;
  current_grade!: Grade;
  all_lessons: LessonDto[] = [];
  all_lessons_string: string[] = [];
  solution: AssignmentSolutionDto | null = null;
  solutionForm: FormGroup;
  grade: number = 0;
  gradeForm: FormGroup;

  courseTitle!: string;
  lessonTitle!: string;
  studentEmail!: string;

  constructor(
    private readonly lessonSevice: LessonsService,
    private readonly courseService: CoursesService,
    private readonly assService: AssignmentInventoryService,
    private readonly routerActive: ActivatedRoute,
    private readonly router: Router
  ) {
    this.solutionForm = new FormGroup({
      solutionContent: new FormControl({value: '', disabled: true}, Validators.required),
    });
    this.gradeForm = new FormGroup({
      grade: new FormControl(1, [Validators.required, Validators.min(0), Validators.max(10)]),
    });
  }

  ngOnInit() {
    this.routerActive.params.subscribe((params) => {
      if (!params['curs']) {
        this.router.navigateByUrl('/courses');
        return;
      }
      if (!params['lesson']) {
        this.router.navigateByUrl('/course/' + params['curs']);
        return;
      }
      this.courseTitle = params['curs'];
      this.lessonTitle = params['lesson'];
      this.routerActive.queryParams.subscribe((queryParams) => {
        if (!queryParams['student']) {
          this.router.navigateByUrl('/course/' + params['curs']);
          return;
        }
        this.studentEmail = queryParams['student'];

        this.assService
          .getAssignment(this.courseTitle, this.lessonTitle)
          .subscribe((assignment) => {
            this.current_assignment = assignment;
          });

        this.assService
          .getSolution(this.courseTitle, this.lessonTitle, this.studentEmail)
          .subscribe((solutions) => {
            if (solutions.length > 0) {
              this.solution = solutions[0];
              console.log(this.solution);
            }
            if (solutions.length > 0) {
              this.solutionForm
                .get('solutionContent')
                ?.setValue(solutions[0].solution);
            }
          });
      });
    });
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      this.grade = this.gradeForm.get('grade')?.value;
      this.assService.gradeAssignment(this.courseTitle, this.lessonTitle, this.studentEmail,this.grade);
      this.router.navigateByUrl('/course/' + this.courseTitle);
    }
  }
}
