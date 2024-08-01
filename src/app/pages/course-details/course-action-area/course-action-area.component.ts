import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseDto } from 'src/app/core/models/course.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { FileReaderService } from 'src/app/core/services/file-reader.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-action-area',
  templateUrl: './course-action-area.component.html',
  styleUrls: ['./course-action-area.component.scss'],
})
export class CourseActionAreaComponent implements AfterContentInit, OnInit {
  @Input({ required: true }) course!: CourseDto;
  minutesDuration: number = 0;
  hoursDuration: number = 0;
  isTeacherOwner = false;
  isEnrolled = false;

  @Output() enrollToCourse: EventEmitter<any> = new EventEmitter();
  image!: string;

  constructor(
    private readonly fileReader: FileReaderService,
    private readonly auth: AuthenticationService,
    private readonly route: Router,
    private readonly courseService: CoursesService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.image = this.fileReader.readImage(
      this.course.imageContents
    );
    console.log(this.course.imageContents)
  }
  readImage(byteArray: string): string {
    return 'data:image/png;base64,' + byteArray;
  }


  ngAfterContentInit() {
    this.hoursDuration = Math.floor(this.course.duration / 60);
    this.minutesDuration = this.course.duration % 60;

    this.image = this.fileReader.readImage(
      this.course.imageContents
    );
    console.log(this.course.imageContents)
    this.isTeacherOwner =
      this.auth.isTeacher() &&
      this.auth.getEmail() === this.course.teacherEmail;
    this.courseService
      .isStudentEnrolled(this.course.name)
      .subscribe((isEnrolled) => {
        this.isEnrolled = isEnrolled;
        console.log(this.isEnrolled)
      });
  }
  enroll() {
    if(!this.auth.isLogged())
      this.route.navigateByUrl('/login')
    if(!this.isEnrolled){
      this.courseService.enrollToCourse(this.course.name).subscribe((success) => {
        if (success) {
          this.courseService
            .isStudentEnrolled(this.course.name)
            .subscribe((isEnrolled) => {
              this.isEnrolled = isEnrolled;
              this.enrollToCourse.emit();
            });
          this.snackBar.open(
            `You are now enrolled in ${this.course.name}!`,
            'Close'
          );
        } else
          this.snackBar.open(`Something happened... Please try again!`, 'Close');
      });
    }else{
      alert('You are already enrolled in this course!');
    }
    
  }

  addLesson() {
    this.route.navigateByUrl(`/add/course/${this.course.name}/lesson`);
  }

  editCourse() {
    this.route.navigateByUrl(`/edit/course/${this.course.name}`);
  }

  deleteCourse() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.deleteCourse(this.course.name).subscribe(() => {
          this.route.navigateByUrl(`/courses`);
          this.snackBar.open(`Course deleted with success!`, 'Close');
        });
      }
    });
  }
}

@Component({
  selector: 'delete-confrim',
  templateUrl: '../delete-confirmation/delete-confirm-dialog.html',
  styleUrls: ['../delete-confirmation/delete-confirm-dialog.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DeleteConfirmDialog {}
