import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  CourseDisplayDto,
  CourseEnrolled,
} from 'src/app/core/models/course.model';
import { StatisticsDto } from 'src/app/core/models/statistics.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-student-dashboard-main',
  templateUrl: './student-dashboard-main.component.html',
  styleUrls: ['./student-dashboard-main.component.scss'],
})
export class StudentDashboardMainComponent implements OnInit {
  statistics: StatisticsDto | undefined;
  enrolledCourses: CourseDisplayDto[] = [];
  totalCourses: number = 0;
  completedCourses: number = 0;
  progressCourses: number = 0;

  studentsInCourses: CourseEnrolled[] = [];
  dataSource = new MatTableDataSource<CourseEnrolled>();

  constructor(
    private readonly statsService: StatisticsService,
    private readonly courseService: CoursesService,
    public readonly auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.auth.isTeacher()) {
      this.statsService.getTeacherStats().subscribe((data) => {
        this.statistics = data;
        this.totalCourses = Object.keys(
          this.statistics.allCoursesCompleted
        ).length;
        this.completedCourses = Object.values(
          this.statistics.allCoursesCompleted
        ).filter((value) => value === 100).length;
        this.progressCourses = this.totalCourses - this.completedCourses;
      });

      let studentsPerCourse: CourseEnrolled[] = [];
      this.courseService.getTeacherCourses(this.auth.getEmail()).subscribe({
        next: (courses) => {
          courses.forEach((course) => {
            this.courseService.getStudentEnrolled(course).subscribe({
              next: (students) => {
                studentsPerCourse.push({
                  courseName: course,
                  studentsNumber: students.length,
                });
                this.studentsInCourses = studentsPerCourse;
                this.dataSource.data = studentsPerCourse;
              },
              error: () => {
                studentsPerCourse.push({
                  courseName: course,
                  studentsNumber: 0,
                });
                this.studentsInCourses = studentsPerCourse;
                this.dataSource.data = studentsPerCourse;
              },
              complete: () => {
                this.dataSource.data = this.dataSource.data.sort(
                  (a, b) => b.studentsNumber - a.studentsNumber
                );
              },
            });
          });
        },
        error: () => {
          console.log('eror');
        },
      });
    } else {
      this.statsService.getStudentStats().subscribe((data) => {
        this.statistics = data;
        this.totalCourses =  Object.keys(this.statistics.allCoursesCompleted).length
        this.completedCourses =  Object.values(this.statistics.allCoursesCompleted).filter((value) => value === 100).length
        this.progressCourses = this.totalCourses - this.completedCourses
      });
      this.courseService.getStudentEnrolledCourses().subscribe((data) => {
        this.enrolledCourses = data;
      });
         
    }
  }
}
