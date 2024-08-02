import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AssignmentDisplayDto,
  AssignmentSolutionDto,
  Grade,
} from 'src/app/core/models/assignment.model';
import {
  LessonDisplayDto,
  LessonDto,
  LessonStatus,
} from 'src/app/core/models/lesson.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { FileReaderService } from 'src/app/core/services/file-reader.service';
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
  grade:string = '-';
  all_lessons: LessonDto[] = [];
  all_lessons_string: string[] = [];
  final_grade: number = 0;
  solution!: AssignmentSolutionDto;
  fileName: string = '';
  file!: File;
  iterations: number = 0;

  isTeacherOwner: boolean = false;
  allLessonStatus = LessonStatus;

  constructor(
    public readonly auth: AuthenticationService,
    private readonly lessonSevice: LessonsService,
    private readonly courseService: CoursesService,
    private readonly assService: AssignmentInventoryService,
    private readonly routerActive: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly fileService: FileReaderService
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
      this.assService
        .getLesson(this.courseId, this.lessonId)
        .subscribe((lesson) => {
          this.current_lesson = lesson;
          if (this.auth.isTeacher())
            this.isTeacherOwner = lesson.teacherEmail === this.auth.getEmail();
        });
      this.assService
        .getAssignment(this.courseId, this.lessonId)
        .subscribe((assignment) => {
          //console.log(assignment);
          this.current_assignment = assignment;
        });
      this.assService
        .getGrade(this.courseId, this.lessonId)
        .subscribe((grade) => {
          console.log(grade);
          //this.current_grade = grade;
          //this.grade = grade.grade;
        });
    });

    this.solution = {
      solution_title: '',
      solution: '',
      fileName: '',
    };

    this.lessonSevice.getAllLessons('').subscribe((lessons) => {
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

  changeLessonStatus(status: LessonStatus) {
    this.lessonSevice
      .changeLessonStatus(this.courseId, this.lessonId, status)
      .subscribe((data) => {
        if (data) {
          this.assService
            .getLesson(this.courseId, this.lessonId)
            .subscribe((lesson) => {
              this.current_lesson = lesson;
            });
          this.snackBar.open(`Lesson status changed!`, 'Close');
        }
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
      this.assService.addSolution(
        this.courseId,
        this.lessonId,
        this.solution,
        this.file
      );
      this.router.navigateByUrl('/course/' + this.courseId);
      return true;
    } else {
      return false;
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  deleteLesson() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.lessonSevice.deleteLesson(this.courseId, this.lessonId).subscribe(
          (response) => this.router.navigateByUrl('/course/' + this.courseId),
          (error) => console.error('Delete error:', error)
        );
      }
    });
  }

  deleteAssignment() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.assService
          .deleteAssignment(this.courseId, this.lessonId)
          .subscribe(
            (response) => this.router.navigateByUrl('/course/' + this.courseId),
            (error) => console.error('Delete error:', error)
          );
      }
    });
  }

  downloadAssignment() {
    if (this.current_assignment[0])
      this.fileService
        .getFile(this.current_assignment[0].assignment_file)
        .subscribe((data: any) => {
          data = data as any;
          const fileContents = data.fileContents;
          const contentType = data.contentType;
          const fileName = data.fileDownloadName || 'download';

          const byteCharacters = atob(fileContents);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: contentType });

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
        });
  }

  goToEditLesson() {
    this.router.navigateByUrl(
      `/edit/course/${this.courseId}/lesson/${this.lessonId}`
    );
  }
}

@Component({
  selector: 'delete-confrim',
  templateUrl: 'delete-confirmation/delete-confirm-dialog.html',
  styleUrls: ['./delete-confirmation/delete-confirm-dialog.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteConfirmDialog {}
