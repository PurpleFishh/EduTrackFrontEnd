import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseDisplayDto, CoursesFilter, CoursesFilterDto } from 'src/app/core/models/course.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  search: string = '';
  sortBy: string = 'relv';
  difficulty: string = 'all';
  categorySelected: string = '';
  prerequisites: { [key: string]: boolean } = {};

  courses: CourseDisplayDto[] = []
  displayedCourses: CourseDisplayDto[] = []

  filtersAvailable: CoursesFilterDto | undefined;

  pageSizeOptions = [12, 20, 24, 32];
  pageSize = this.pageSizeOptions[1];

  constructor(private readonly coursesService: CoursesService,
     private readonly routerActive: ActivatedRoute,
     private readonly router: Router,
     public readonly auth: AuthenticationService
    ) {}

  ngOnInit(){
    this.routerActive.queryParams.subscribe(params => {
      this.search = params['search'];
      if(params['sort'])
        this.sortBy = params['sort'];
      else
        this.sortBy = 'relv';
      this.categorySelected = params['category'];
      if(params['difficulty'])
        this.difficulty = params['difficulty'];
      else
        this.difficulty = 'all';
      let prereqFiltrt = [];
      if(params['prerequisites'])
      {
        prereqFiltrt = params['prerequisites'].split(',');
        this.prerequisites = prereqFiltrt.reduce((acc: { [x: string]: boolean; }, value: string | number) => {
          acc[value] = true;
          return acc;
        }, {} as { [key: string]: boolean });
      }
      else
        this.prerequisites = {};

      let filter: CoursesFilter = {
          search: this.search,
          sortBy: this.sortBy === 'relv' ? '' : this.sortBy,
          categories: this.categorySelected,
          difficulties: this.difficulty === 'all' ? '' : this.difficulty,
          prerequistes: prereqFiltrt
      }
      this.coursesService.getCourses(filter).subscribe(courses => {
        console.log(courses);
        //this.courses.push( courses)
        this.courses = courses;
        this.displayedCourses = this.courses.slice(0, this.pageSize);
      });
      this.coursesService.getFilters(filter).subscribe(filters => {
        this.filtersAvailable = filters
        console.log(this.filtersAvailable);
      });
      
    });
  }

  handlePageEvent(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    this.displayedCourses = this.courses.slice(startIndex, startIndex + event.pageSize);
  }

  difficultySelected(difficulty: string) {
    this.difficulty = difficulty;
    this.prerequisites = {};

    this.filterCourses();  
  }

  sortBySelected(sort: string) {
    this.sortBy = sort;

    this.filterCourses();  
  }

  categorySelect(category: string) {
    this.categorySelected = category;
    this.difficulty = 'all';
    this.prerequisites = {};

    this.filterCourses();
  }

  onPrerequisitesChange(prereq: string, selected: boolean) {
    this.prerequisites[prereq] = selected;
    this.filterCourses();
  }

  addCourse()
  {
    this.router.navigateByUrl('add/course');
  }

  filterCourses() {
    let url = `courses`;
    let querys: string[] = [];
    if(this.search)
      querys.push(`search=${this.search}`)
    if(this.sortBy)
      querys.push(`sort=${this.sortBy}`)
    if(this.categorySelected)
      querys.push(`category=${this.categorySelected}`)
    if(this.difficulty !== 'all')
      querys.push(`difficulty=${this.difficulty}`)

    let prereqs = Object.keys(this.prerequisites).filter(key => this.prerequisites[key]);
    if(prereqs.length > 0)
      querys.push(`prerequisites=${prereqs.join(',')}`)

    url += `?${querys.join('&')}`;
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
