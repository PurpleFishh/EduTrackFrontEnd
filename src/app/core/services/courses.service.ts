import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { CourseDisplayDto } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  readonly endpoint: string = 'Course';

  constructor(private readonly baseService: RestBaseService) { }

  getCourses() {
    console.log('getCourses');
    return this.baseService.get<CourseDisplayDto[]>(`${this.endpoint}/GetAllCourses`);
  }
}
