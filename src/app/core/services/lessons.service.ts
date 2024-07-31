import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LessonDto } from '../models/lesson.model';
import { Observable } from 'rxjs';
import { StudentDto } from '../models/student.model';

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
getLesson(courseTitle: string, lessonTitle: string): Observable<LessonDto> {
  const url = `${this.endpoint}/GetLesson?courseTitle=${courseTitle}&lessonTitle=${lessonTitle}`;
  return this.baseService.get<LessonDto>(url);
}

makeAttendance(courseTitle: string, lessonTitle: string, students: StudentDto[])
{
  const url= `${this.endpoint}/MakeAttendance?courseName=${courseTitle}&lessonTitle=${lessonTitle}`;
  return this.baseService.add<boolean,StudentDto[] >(url,students);
}


}
