import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/assignment.model';
import { CourseDisplayDto, CoursesFilter } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-student-dashboard-assignments',
  templateUrl: './student-dashboard-assignments.component.html',
  styleUrls: ['./student-dashboard-assignments.component.scss']
})
export class StudentDashboardAssignmentsComponent {
  currentCourse!: string;
  courses: CourseDisplayDto[] = [];
  prereqFiltrt: string[] = [];

  menuItems: MenuItem[] = [
  ];
  constructor(private readonly statsService: StatisticsService, private readonly courseService: CoursesService){}

  ngOnInit(): void {

    let filter: CoursesFilter = {
      search: '',
      sortBy: '',
      categories: '',
      difficulties: '',
      prerequistes: this.prereqFiltrt
  }
    this.courseService.getCourses(filter).subscribe(courses => {
      console.log(courses);
      this.courses = courses;
      this.currentCourse = courses[0].name;
      this.menuItems = courses.map(course => ({ label: course.name }));

    });
  }


  selectCourse(course: string) {
    this.currentCourse = course;
  }

}
