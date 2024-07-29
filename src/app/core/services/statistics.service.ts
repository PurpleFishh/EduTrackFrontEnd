import { Injectable } from '@angular/core';
import { StatisticsDto } from '../models/statistics.model';
import { RestBaseService } from './rest-base.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CourseDisplayDto } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  readonly endpoint: string = 'Statistics';

  constructor(private readonly baseService: RestBaseService) {}

  getStudentStats(): Observable<StatisticsDto> {
    return this.baseService.get<StatisticsDto>(`${this.endpoint}/GetStudentStats`);
  }
}
