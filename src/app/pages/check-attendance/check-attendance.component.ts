import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importă Router
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { StudentDto } from 'src/app/core/models/student.model';

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.component.html',
  styleUrls: ['./check-attendance.component.scss']
})
export class CheckAttendanceComponent implements OnInit {
  courseTitle: string;
  lessonTitle: string;
  studentsEnrolled: StudentDto[];
  attendanceStatus: boolean[];
  displayedColumns: string[] = ['name', 'email', 'status']; // Add this line

  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private router: Router // Injectează Router
  ) {
    this.courseTitle = localStorage.getItem('courseTitle') || 'Franceza';
    this.lessonTitle = localStorage.getItem('lessonTitle') || 'lectie5';
    this.studentsEnrolled = [];
    this.attendanceStatus = [];
  }

  ngOnInit(): void {
    this.getStudentsEnrolled(this.courseTitle);
  }

  getStudentsEnrolled(courseTitle: string): void {
    this.coursesService.getStudentEnrolled(courseTitle).subscribe({
      next: (data: StudentDto[]) => {
        this.studentsEnrolled = data;
        this.attendanceStatus = new Array(data.length).fill(false); // Initialize attendanceStatus
      },
      error: (error) => {
        console.error('Error fetching students', error);
      }
    });
  }

  markAttendance(): void {
    const attendanceData = this.studentsEnrolled.map((student, index) => ({
      ...student,
      Attended: this.attendanceStatus[index]
    }));

    this.lessonsService.makeAttendance(this.courseTitle, this.lessonTitle, attendanceData).subscribe({
      next: (response) => {
        console.log('Attendance marked successfully', response);
        if (response) {
          this.router.navigate(['']); // Redirecționează către pagina principală
        }
      },
      error: (error) => {
        console.error('Error marking attendance', error);
      }
    });
  }

  toggleAttendance(index: number): void {
    this.attendanceStatus[index] = !this.attendanceStatus[index];
  }
}
