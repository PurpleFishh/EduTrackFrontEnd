import { Component } from '@angular/core';
import {
  AllAssignments,
  AssignmentDisplayDto,
  AssignmentDto,
  AttendanceDictionary,
  MenuItem,
  StudentGrade,
} from 'src/app/core/models/assignment.model';
import { AttendanceDto } from 'src/app/core/models/attendance.model';
import {
  CourseDisplayDto,
  CoursesFilter,
} from 'src/app/core/models/course.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-student-dashboard-assignments',
  templateUrl: './student-dashboard-assignments.component.html',
  styleUrls: ['./student-dashboard-assignments.component.scss'],
})
export class StudentDashboardAssignmentsComponent {
  currentCourse!: string;
  courses: CourseDisplayDto[] = [];
  prereqFiltrt: string[] = [];
  assignments: StudentGrade[] = [];
  selectedLesson: string | null = null;
  attendedStudents: number = 0;
  attendancePercentage: number = 0;
  attendanceRecords: AttendanceDictionary = {};
  totalLessons: number = 0;
  currentLesson!: string;
  allLessons!: AttendanceDto[];

  menuItems: MenuItem[] = [];
  constructor(
    private readonly statsService: StatisticsService,
    private readonly courseService: CoursesService,
    private readonly assignmentService: AssignmentInventoryService,
    private lessonsService: LessonsService
  ) {}

  ngOnInit(): void {
    let filter: CoursesFilter = {
      search: '',
      sortBy: '',
      categories: '',
      difficulties: '',
      prerequistes: this.prereqFiltrt,
    };
    this.courseService.getCourses(filter).subscribe((courses) => {
      this.courses = courses;
      this.currentCourse = courses[0].name;
      this.menuItems = courses.map((course) => ({ label: course.name }));

      this.assignmentService.getStudentSentAssignments(this.currentCourse).subscribe((assignments) => {
        this.assignments = assignments;
        // this.assignments = assignments.map((subArray) =>
        //   subArray.filter(
        //     (assignment) => assignment.student.email === 'teacher@teacher.com'
        //   )
        // );
        console.log(this.assignments);
      });
    });
  }

  // getLessonNames(): string[] {
  //   return Object.keys(this.allLessons);
  // }

  // isLessonAttended(lessonName: string): boolean {
  //   const records = this.allLessons[lessonName];
  //   return records.some((record) => record.attended);
  // }

  fetchAttendanceDetails(lessonName: string): void {
    this.selectedLesson = lessonName;
    this.courseService
      .getStudentAttendance(this.currentCourse!)
      .subscribe((allLessons) => {
        this.totalLessons = Object.keys(allLessons).length;
        this.attendedStudents = 0;
        this.allLessons = allLessons;

        allLessons.forEach((lesson) => {
          if (lesson.attended) this.attendedStudents++;
        });

        if (this.totalLessons > 0) {
          this.attendancePercentage =
            (this.attendedStudents / this.totalLessons) * 100;
        } else {
          this.attendancePercentage = 0;
        }
      });
  }

  fetchAssignments(): void {
    this.assignmentService.getStudentSentAssignments(this.currentCourse).subscribe((assignments) => {
      this.assignments = assignments;
      console.log(this.assignments);
    });
  }

  selectCourse(course: string) {
    this.currentCourse = course;
    this.fetchAttendanceDetails(this.currentLesson);
    this.fetchAssignments();
  }
}
