import { Component } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StudentDto } from 'src/app/core/models/student.model';

@Component({
  selector: 'app-teacher-dashboard-students-enrolled',
  templateUrl: './teacher-dashboard-students-enrolled.component.html',
  styleUrls: ['./teacher-dashboard-students-enrolled.component.scss']
})
export class TeacherDashboardStudentsEnrolledComponent {

  courses: string[] = [];
  firstCourseTitle: string = '';
  selectedCourse: string | null = null;
  studentsEnrolled: StudentDto[] = [];
  totalStudents: number = 0;

  displayedColumns: string[] = ['name', 'email'];

  constructor(
    private coursesService: CoursesService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    const teacherEmail = this.authService.getEmail();
    this.coursesService.getTeacherCourses(teacherEmail).subscribe({
      next: (data: string[]) => {
        this.courses = data;
        if (this.courses.length > 0) {
          this.firstCourseTitle = this.courses[0];
        } else {
          this.firstCourseTitle = 'No courses available';
        }
      },
      error: (error) => {
        console.error('Error fetching courses', error);
        this.firstCourseTitle = 'No courses available';
      }
    });
  }

  fetchCourseDetails(course: string): void {
    this.selectedCourse = course;
    this.coursesService.getStudentEnrolled(course).subscribe({
      next: (students: StudentDto[]) => {
        this.totalStudents = students.length;
        this.studentsEnrolled = students;
      },
      error: (error) => {
        console.error('Error fetching enrolled students', error);
      }
    });
  }

}
