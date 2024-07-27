import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LessonDisplayDto, LessonDto } from '../models/lesson.model';
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
    return this.baseService.add<boolean, LessonDto>(
      url,
      lesson
    );
  }
  updateLesson(lessonTitle: string,lesson: LessonDto): Observable<boolean> {
    const payload = {
      lessonTitle,
      lessonData: lesson
    };
    const url = `${this.endpoint}/EditLesson?lessonTitle=${lessonTitle}`;
    return this.baseService.update<boolean, LessonDto>(
      url,
      lessonTitle,
      lesson
    );
}

  deleteLesson(){
    const courseName = localStorage.getItem('course') || 'aaa';
    const lessonTitle = localStorage.getItem('lesson') || 'ccc';

    return this.baseService.deleteAss<boolean>(`${this.endpoint}/DeleteLesson?CourseName=${courseName}&LessonTitle=${lessonTitle}`);
  }

  getLesson(courseTitle: string, lessonTitle: string): Observable<LessonDto> {
    const url = `${this.endpoint}/GetLesson?courseTitle=${courseTitle}&lessonTitle=${lessonTitle}`;
    return this.baseService.get<LessonDto>(url);
  }

  getAllLessons(id: string){
    return this.baseService.get<LessonDisplayDto[]>(`${this.endpoint}/GetAllLessons?courseName=${id}`);
  }
}