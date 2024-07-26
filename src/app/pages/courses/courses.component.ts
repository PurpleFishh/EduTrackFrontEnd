import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseDisplayDto, CoursesFilter, CoursesFilterDto } from 'src/app/core/models/course.model';
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
  filtersAvailable: CoursesFilterDto | undefined;

  constructor(private readonly coursesService: CoursesService,
     private readonly routerActive: ActivatedRoute,
     private readonly router: Router
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
        this.courses = courses
      });
      this.coursesService.getFilters(filter).subscribe(filters => {
        this.filtersAvailable = filters
        console.log(this.filtersAvailable);
      });
    });
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

  courses2 = [
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'React',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A JavaScript library for building user interfaces.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
      title: 'Vue',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A progressive framework for building user interfaces.',
      image: 'https://vuejs.org/images/logo',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      image:
        '' +
        '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',
    },
  ];
}
