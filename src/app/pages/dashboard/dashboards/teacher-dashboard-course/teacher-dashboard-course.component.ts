import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { AllAssignments, AssignmentDisplayDto, Grade, Student } from 'src/app/core/models/assignment.model';
import { LessonDisplayDto } from 'src/app/core/models/lesson.model';
import { StudentDto } from 'src/app/core/models/student.model';
import { AttendanceDictionary } from 'src/app/core/models/attendance.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard-course',
  templateUrl: './teacher-dashboard-course.component.html',
  styleUrls: ['./teacher-dashboard-course.component.scss']
})
export class TeacherDashboardCourseComponent implements OnInit {
  courses: string[] = [];
  firstCourseTitle: string = '';
  firstLessonTitle: string = ''; 
  selectedCourse: string | null = null;
  selectedLesson: string | null = null;
  lessons: LessonDisplayDto[] = [];
  totalStudents: number = 0;
  attendedStudents: number = 0;
  attendancePercentage: number = 0;
  studentsEnrolled: StudentDto[] = [];
  attendanceRecords: AttendanceDictionary = {};
  displayedColumns: string[] = ['name', 'email', 'status'];
  
  // New properties for assignments
  //assignments: AssignmentDisplayDto[] = [];
  assignments: AllAssignments[] = [];
  displayedColumnsAssignments: string[] = ['assignmentName', 'status', 'grade'];
  //assignmentGrades: { [key: string]: { status: string, grade: number } } = {};

  

  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private authService: AuthenticationService,
    private assignmentService: AssignmentInventoryService,
    private readonly router: Router
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
          this.selectedCourse = this.firstCourseTitle;
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
        this.fetchLessons(course);
      },
      error: (error) => {
        console.error('Error fetching enrolled students', error);
      }
    });
  }

  fetchLessons(course: string): void {
    this.lessonsService.getAllLessons(course).subscribe({
      next: (lessons: LessonDisplayDto[]) => {
        this.lessons = lessons;
        if (this.lessons.length > 0) {
          this.firstLessonTitle = this.lessons[0].name;
          this.selectedLesson = this.firstLessonTitle; 
        }
      },
      error: (error) => {
        console.error('Error fetching lessons', error);
      }
    });
  }

  fetchAttendanceDetails(lessonName: string): void {
    this.selectedLesson = lessonName;
    this.lessonsService.getAllAttendance(this.selectedCourse!).subscribe({
      next: (attendance: AttendanceDictionary) => {
        this.attendanceRecords = attendance;
        const lessonAttendance = attendance[lessonName] || [];
        let attendedCount = 0;

        for (const attendanceRecord of lessonAttendance) {
          if (attendanceRecord.attended) {
            attendedCount++;
          }
        }

        this.attendedStudents = attendedCount;
        this.attendancePercentage = (this.attendedStudents / this.totalStudents) * 100;

        // Fetch assignments for the selected lesson
        this.fetchAssignments(this.selectedCourse!, lessonName);
      },
      error: (error) => {
        console.error('Error fetching attendance', error);
      }
    });
  }

  getStudentStatus(email: string, lessonName: string): string {
    const lessonAttendance = this.attendanceRecords[lessonName] || [];
    const record = lessonAttendance.find(record => record.studentEmail === email);
    return record && record.attended ? 'Attended' : 'Skipped';
  }

  // New methods for assignments
  fetchAssignments(course: string, lesson: string): void {
    this.assignmentService.getAllAssignmentsSent(course, lesson).subscribe({
      next: (assignments: AllAssignments[][]) => {
        this.assignments = assignments.flat();
        //this.assignmentGrades = {}; // Clear previous assignment grades
        // if (assignments.length > 0) {
        //   this.studentsEnrolled.forEach(student => {
        //     assignments.forEach(assignment => {
        //       this.fetchAssignmentGrade(course, lesson, student.email, assignment.assignment_name);
        //     });
        //   });
        // }
      },
      error: (error) => {
        console.error('Error fetching assignments', error);
      }
    });
  }

  // fetchAssignmentGrade(course: string, lesson: string, email: string, assignmentName: string): void {
  //   this.assignmentService.getStudentGrade(course, lesson, email).subscribe({
  //     next: (grades: number[]) => {
  //       const grade = grades[0] || null;
  //       this.assignmentGrades[email + assignmentName] = {
  //         status: grade !== null ? 'Graded' : 'Ungraded',
  //         grade: grade !== null ? grade : 0
  //       };
  //     },
  //     error: (error) => {
  //       console.error('Error fetching assignment grades', error);
  //     }
  //   });
  // }

  // getAssignmentGrade(email: string, assignmentName: string): number {
  //   //return this.assignmentGrades[email + assignmentName]?.grade || 0;
  //   return this.assignments?.grade || 0;
  // }
  getAssignmentGrade(ass: AllAssignments): number {
    //return this.assignmentGrades[email + assignmentName]?.grade || 0;
    return ass?.grade !== null ? ass?.grade : 0;
  }

  // getAssignmentStatus(email: string, assignmentName: string): string {
  //   return this.assignmentGrades[email + assignmentName]?.status || 'Ungraded';
  // }
  getAssignmentStatus(ass: AllAssignments): string {
    const status =  ass?.grade !== null && ass?.grade !== 0;
    return status ? 'Graded' : 'Ungraded';
  }

  gradeAssignment(student: Student)
  {
    console.log(student)
    this.router.navigateByUrl(`course/${this.selectedCourse}/lesson/${this.selectedLesson}/grade?student=${student.email}`)
  }
}
