import { Component } from '@angular/core';
import { CourseDisplayDto } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-student-dashboard-main',
  templateUrl: './student-dashboard-main.component.html',
  styleUrls: ['./student-dashboard-main.component.scss'],
})
export class StudentDashboardMainComponent {
  course: CourseDisplayDto = {
    name: 'Angular',
    shortDescription:
      'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    imageContents: 'assets/angular.png',
    difficulty: 'Intermediate',
    prerequisites: 'HTML, CSS, JavaScript',
  };
}
