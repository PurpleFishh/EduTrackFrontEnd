import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseDisplayDto, CoursesFilter, CoursesFilterDto } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/courses.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  courses: CourseDisplayDto[] = []
  newCourses: CourseDisplayDto[] = []
  filtersAvailable: CoursesFilterDto | undefined;

  constructor(private readonly coursesService: CoursesService,
     private readonly routerActive: ActivatedRoute,
     private readonly router: Router
    ) {}

  ngOnInit() {

    let filter: CoursesFilter = {
      search: '',
      sortBy: '',
      categories: '',
      difficulties: '',
      prerequistes: []
  }

    this.coursesService.getCourses(filter)
    .pipe(
      finalize(() => {
        this.courses = this.courses.slice(0,3);
        console.log(this.courses);
      })
    )
    .subscribe(courses => {
      console.log(courses);
      this.courses = courses
     
    });

  }

  navigate(route:string) {
    this.router.navigateByUrl(route);
  }
}
