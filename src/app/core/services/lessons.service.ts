import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LessonDisplayDto } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  readonly endpoint: string = 'Lesson';

  constructor(private readonly baseService: RestBaseService) {}

  getAllLessons(id: string){
    return this.baseService.get<LessonDisplayDto[]>(`${this.endpoint}/GetAllLessons?courseName=${id}`);
  }
}
