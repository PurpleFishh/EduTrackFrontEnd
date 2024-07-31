import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
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

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
})
export class LessonDetailsComponent {
  courseId!: string;
  lessonId!: string;

  current_assignment: AssignmentDisplayDto[] = [];
  current_lesson: LessonDisplayDto | undefined;
  current_grade: Grade | undefined;
  all_lessons: LessonDto[] = [];
  all_lessons_string: string[] = [];
  final_grade: number = 0;
  solution!: AssignmentSolutionDto;
  fileName: string = '';
  file!: File;
  iterations: number = 0;

  constructor(
    private readonly lessonSevice: LessonsService,
    private readonly courseService: CoursesService,
    private readonly assService: AssignmentInventoryService,
    private readonly routerActive: ActivatedRoute,
    private readonly router: Router
  ) {}

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
      this.courseId = params['curs'];
      this.lessonId = params['lesson'];
      this.assService.getLesson(this.courseId, this.lessonId).subscribe((lesson) => {
        this.current_lesson = lesson;
      });
      this.assService.getAssignment(this.courseId, this.lessonId).subscribe((assignment) => {
        //console.log(assignment);
        this.current_assignment = assignment;
      });
      this.assService.getGrade(this.courseId, this.lessonId).subscribe((grade) => {
        //console.log(grade);
        this.current_grade = grade;
      });
    });

    this.solution = {
      solution_title: '',
      solution: '',
    };
    
    this.lessonSevice.getAllLessons().subscribe((lessons) => {
      //console.log(lessons);
      for (let lesson of lessons) {
        this.all_lessons_string.push(lesson.name);
      }
      //console.log(this.all_lessons_string);
      for (let lesson of this.all_lessons_string) {
        this.iterations++;
        this.assService.getAllGrades(lesson).subscribe((grade) => {
          this.final_grade += Number(grade);
          //console.log(this.iterations);
        });
      }
      this.final_grade = this.final_grade / this.iterations;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
    }
  }

  isFormValid(): boolean {
    return (
      this.solution.solution_title.trim() !== '' &&
      this.solution.solution.trim() !== '' &&
      this.file !== null
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.assService.addSolution(this.solution, this.file);
      return true;
    } else {
      return false;
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
