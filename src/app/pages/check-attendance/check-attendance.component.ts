import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importă Router
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { StudentDto } from 'src/app/core/models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.component.html',
  styleUrls: ['./check-attendance.component.scss'],
})
export class CheckAttendanceComponent implements OnInit {
  courseTitle!: string;
  lessonTitle!: string;
  studentsEnrolled: StudentDto[];
  attendanceStatus: boolean[];
  displayedColumns: string[] = ['name', 'email', 'status'];

  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private router: Router,
    private readonly routerActive: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) {
    this.studentsEnrolled = [];
    this.attendanceStatus = [];
  }

  ngOnInit(): void {
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
      this.getStudentsEnrolled(this.courseTitle);
    });
  }

  getStudentsEnrolled(courseTitle: string): void {
    this.coursesService.getStudentEnrolled(courseTitle).subscribe({
      next: (data: StudentDto[]) => {
        this.studentsEnrolled = data;
        this.attendanceStatus = new Array(data.length).fill(false);
      },
      error: (error) => {
        console.error('Error fetching students', error);
      },
    });
  }

  markAttendance(): void {
    const attendanceData = this.studentsEnrolled.map((student, index) => ({
      ...student,
      Attended: this.attendanceStatus[index],
    }));

    this.lessonsService
      .makeAttendance(this.courseTitle, this.lessonTitle, attendanceData)
      .subscribe({
        next: (response) => {
          if (response) {
            this.router.navigateByUrl(
              `/course/${this.courseTitle}/lesson/${this.lessonTitle}`
            );
            this.snackBar.open(`Attendance marked successfully!`, 'Close', {
              duration: 3 * 1000,
            });
          }
        },
        error: (error) => {
          console.error('Error marking attendance', error);
          this.snackBar.open(
            'Something happened... Please try again!',
            'Dismiss',
            {
              duration: 3 * 1000,
            }
          );
        },
      });
  }

  toggleAttendance(index: number): void {
    this.attendanceStatus[index] = !this.attendanceStatus[index];
  }
}
