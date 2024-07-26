import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {
  CourseDisplayDto,
  CoursesFilter,
  CoursesFilterDto,
} from '../models/course.model';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  readonly endpoint: string = 'Course';

  constructor(private readonly baseService: RestBaseService) {}

  getCourses(filter: CoursesFilter) {
    let url = this.getUrlForFilter(`${this.endpoint}/GetAllCourses`, filter);
    return this.baseService.get<CourseDisplayDto[]>(url);
  }

  getFilters(filter: CoursesFilter) {
    let url = this.getUrlForFilter(`${this.endpoint}/GetFilters`, filter);
    return this.baseService.get<CoursesFilterDto>(url);
  }

  private getUrlForFilter(baseUrl: string, filter: CoursesFilter) {
    let querys: string[] = [];
    if (filter.search) querys.push(`Title=${filter.search}`);
    if (filter.sortBy) querys.push(`SortBy=${filter.sortBy}`);
    if (filter.difficulties) querys.push(`Difficulties=${filter.difficulties}`);
    if (filter.categories) querys.push(`Categories=${filter.categories}`);
    if (filter.prerequistes.length > 0) {
      filter.prerequistes.forEach((p) => {
        querys.push(`Prerequistes=${p}`);
      });
    }
    baseUrl += `?${querys.join('&')}`;
    return baseUrl;
  }

  searchCourses(search: string) {
    return this.baseService.get<CourseDisplayDto[]>(
      `${this.endpoint}/GetAllCourses/?title=${search}`
    );
  }
}
