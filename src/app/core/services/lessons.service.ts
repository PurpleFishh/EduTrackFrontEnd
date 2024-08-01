import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {
  LessonDisplayDto,
  LessonDto,
  LessonStatus,
} from '../models/lesson.model';
import { StudentDto } from '../models/student.model';
import { AttendanceDto } from '../models/attendance.model';
import { AttendanceDictionary } from '../models/attendance.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  readonly endpoint: string = 'Lesson';
  constructor(private readonly baseService: RestBaseService) {}

  addLesson(
    courseTitle: string,
    teacherEmail: string,
    lesson: LessonDto
  ): Observable<boolean> {
    const payload = {
      teacherEmail,
      lessonData: lesson,
    };
    const url = `${this.endpoint}/AddLesson?courseTitle=${courseTitle}`;
    return this.baseService.add<boolean, LessonDto>(url, lesson);
  }
  updateLesson(lessonTitle: string, lesson: LessonDto): Observable<boolean> {
    const url = `${this.endpoint}/EditLesson?lessonTitle=${lessonTitle}`;
    return this.baseService.update<boolean, LessonDto>(url, lesson);
  }

  deleteLesson(courseId: string, lessonId: string): Observable<boolean> {
    return this.baseService.deleteAss<boolean>(
      `${this.endpoint}/DeleteLesson?CourseName=${courseId}&LessonTitle=${lessonId}`
    );
  }

  getLesson(courseTitle: string, lessonTitle: string): Observable<LessonDto> {
    const url = `${this.endpoint}/GetLesson?courseTitle=${courseTitle}&lessonTitle=${lessonTitle}`;
    return this.baseService.get<LessonDto>(url);
  }

  getAllLessons(id: string) {
    return this.baseService.get<LessonDisplayDto[]>(
      `${this.endpoint}/GetAllLessons?courseName=${id}`
    );
  }

  changeLessonStatus(
    courseId: string,
    lessonId: string,
    status: LessonStatus
  ): Observable<boolean> {
    const url = `${this.endpoint}/ChangeLessonStatus?courseTitle=${courseId}&lessonTitle=${lessonId}&status=${status}`;
    return this.baseService.add(url, {});
  }
  makeAttendance(
    courseTitle: string,
    lessonTitle: string,
    students: StudentDto[]
  ) {
    const url = `${this.endpoint}/MakeAttendance?courseName=${courseTitle}&lessonTitle=${lessonTitle}`;
    return this.baseService.add<boolean, StudentDto[]>(url, students);
  }
  getAllAttendance(courseTitle: string): Observable<AttendanceDictionary> {
    const url = `${this.endpoint}/GetAllAttendace?courseName=${courseTitle}`;
    return this.baseService.get<AttendanceDictionary>(url);
  }
}
