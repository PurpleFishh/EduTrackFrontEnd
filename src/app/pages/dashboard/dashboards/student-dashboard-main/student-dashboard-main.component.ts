import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { StatisticsDto } from 'src/app/core/models/statistics.model';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-student-dashboard-main',
  templateUrl: './student-dashboard-main.component.html',
  styleUrls: ['./student-dashboard-main.component.scss'],
})
export class StudentDashboardMainComponent implements OnInit {
  statistics: StatisticsDto | undefined
  enrolledCourses: CourseDisplayDto[] = [];
  totalCourses: number = 0;
  completedCourses: number = 0;
  progressCourses: number = 0;

  constructor(private readonly statsService: StatisticsService, private readonly courseService: CoursesService){}

  ngOnInit(): void {
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
