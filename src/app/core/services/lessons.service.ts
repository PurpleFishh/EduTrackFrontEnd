import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LessonDto } from '../models/lesson.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  readonly endpoint: string = 'Lesson';
  constructor(private readonly baseService: RestBaseService) {}

  addLesson(courseTitle: string, teacherEmail: string, lesson: LessonDto): Observable<boolean> {
    const payload = {
      teacherEmail,
      lessonData: lesson
    };
    const url = `${this.endpoint}/AddLesson?courseTitle=${courseTitle}`;
    return this.baseService.add<boolean, { teacherEmail: string; lessonData: LessonDto }>(
      url,
      payload
    );
  }
}
