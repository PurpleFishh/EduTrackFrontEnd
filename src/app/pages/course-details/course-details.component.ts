import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
    courseId: string = '';
    descriptionExpanded = false;

    constructor(private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.courseId = params['id'];
        console.log('Test ID:', this.courseId);
      });
    }

}
